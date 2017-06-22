// load needed modules
const constants = require('./../conf/constants')
var errorFactory = require('./../factories/error')
var database = require('./../database')
var crypto = require('crypto')

// load needed validators
var userValidator = require('./../validators/user')
var databaseValidator = require('./../validators/database')
module.exports = {

  /**
   * register a new user
   * @param  {String}   name            name of the new user
   * @param  {String}   mail            mail of the new user
   * @param  {String}   password        password of the new user
   * @param  {String}   passwordConfirm confirmation copy of the password
   * @param  {Integer}  type            user type (see constants for possible values)
   * @param  {String}   databaseName    name of the database
   * @param  {Function} callback        callback function
   * @return {void}
   */
  register: function (name, mail, password, passwordConfirm, databaseName, callback) {

    // validate name
    userValidator.name(name, function (result) {
      if (errorFactory.containsError(result)) {
        callback(result)
        return
      }

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

          // validate passwordConfirm
          userValidator.password(passwordConfirm, function (result) {
            if (errorFactory.containsError(result)) {
              callback(result)
              return
            }

            // check that passwords match
            if (password !== passwordConfirm) {
              const error = errorFactory.generate(constants.errors.no_match, { things: 'passwords' })
              callback({ error })
              return
            }

            // validate databaseName
            databaseValidator.name(databaseName, function (result) {
              if (errorFactory.containsError(result)) {
                callback(result)
                return
              }

              // get connection
              let connection = database.getConnection(databaseName)

              // check that mail and name are not in use
              connection.query(constants.queries.checkExistingUsers, [mail, name], function (error, rows) {

                // call back error if any
                if (error) {
                  console.log('killing connection')
                  connection.end()
                  callback({ error })
                  return
                }

                if (rows.length !== 0) {
                  console.log('killing connection')
                  connection.end()
                  const error = errorFactory.generate(constants.errors.in_use, {thing: 'mail or username'})
                  callback({ error })
                  return
                } else {

                  // calculate password hash
                  var passwordHash = crypto.createHash('sha256').update(password).digest('hex')

                  // insert new user into database
                  connection.query(constants.queries.addUser, { name: name, mail: mail, passwordHash: passwordHash, confirmed: 0 }, function (error) {
                    console.log('killing connection')
                    connection.end()

                    // call back err if any
                    if (error) {
                      callback({ error })
                      return
                    } else {
                      callback({ error: 'none' })
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
