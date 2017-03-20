// load needed modules
const constants = require('./../conf/constants')
var callbackFactory = require('./../factories/callback')
var errorFactory = require('./../factories/error')
var database = require('./../database')
var crypto = require('crypto')

// load needed validators
var userValidator = require('./../validators/user')
var databaseValidator = require('./../validators/database')

module.exports = {

  /**
   * register a new user
   * @param  {String}   mail            mail of the new user
   * @param  {String}   password        password of the new user
   * @param  {String}   passwordConfirm confirmation copy of the password
   * @param  {Integer}  type            user type (see constants for possible values)
   * @param  {String}   databaseName    name of the database
   * @param  {Function} callback        callback function
   * @return {void}
   */
  register: function (mail, password, passwordConfirm, type, databaseName, callback) {

    // validate mail
    userValidator.mail(mail, function (result) {
      if (errorFactory.containsError(result)) {
        callback(result)
        return
      }

      // validate password
      userValidator.password(password, function (result) {
        if (errorFactory.containsError(result)) {
          callback(result)
          return
        }

        // validate type
        userValidator.type(type, function (result) {
          if (errorFactory.containsError(result)) {
            callback(result)
            return
          }

          // validate databaseName
          databaseValidator.name(databaseName, function (result) {
            if (errorFactory.containsError(result)) {
              callback(result)
              return
            }

            // check that passwords match
            if (password !== passwordConfirm) {
              callback(callbackFactory.error(constants.errors.no_match({things: 'passwords'})))
              return
            }

            // pool connection
            database.pool(databaseName).getConnection(function (err, connection) {

              // call back err if any
              if (err) {
                callback(callbackFactory.error(err, constants.responses.register))
                return
              }

              // check that mail is not in use
              connection.query('SELECT id FROM user WHERE mail = ?', [mail], function (err, rows) {

                // call back err if any
                if (err) {
                  callback(callbackFactory.error(err, constants.responses.register))
                  return
                }

                if (rows.length !== 0) {
                  callback(callbackFactory.error(constants.errors.in_use, {thing: 'mail'}))
                  return
                } else {

                  // calculate password hash
                  var passwordHash = crypto.createHash('sha256').update(password).digest('hex')

                  // insert new user into database
                  connection.query('INSERT INTO user SET ?', { mail: mail, passwordHash: passwordHash, type: type, confirmed: 0 }, function (err) {

                    // call back err if any
                    if (err) {
                      callback(callbackFactory.error(err, constants.responses.register))
                      return
                    } else {
                      callback(callbackFactory.error('none', constants.responses.register))
                    }
                  })
                }
              })
            })
          })
        })
      })
    })
  }
}
