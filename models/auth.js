// load needed modules
var crypto = require('crypto')
var callbackFactory = require('./../factories/callback')
var errorFactory = require('./../factories/error')
var database = require('./../database')
var constants = require('./../conf/constants')

// load needed validators
var userValidator = require('./../validators/user')
var authValidator = require('./../validators/auth')
var databaseValidator = require('./../validators/database')

module.exports = {

  /**
   * create a new session or update an existing one
   * @param  {String}   mail         mail of the user
   * @param  {String}   password     password of the user
   * @param  {String}   databaseName name of the database
   * @param  {Function} callback     callback function
   * @return {void}
   */
  create: function (mail, password, databaseName, callback) {

    // validate database name
    databaseValidator.name(databaseName, function (result) {
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

          // pool connection
          database.pool(databaseName).getConnection(function (err, connection) {

            // call back err if any
            if (err) {
              callback(callbackFactory.error(err, constants.responses.database))
              return
            }

            // hash password
            var passwordHash = crypto.createHash('sha256').update(password).digest('hex')

            // get user ID
            connection.query('SELECT id FROM user WHERE mail = ? AND passwordHash = ? AND confirmed = 1', [mail, passwordHash], function (err, rows) {

              // call back err if any
              if (err) {
                callback(callbackFactory.error(err, constants.responses.database))
                return
              }

              // mail is unique, so only one or zero rows are possible
              if (rows.length === 0) {
                const error = errorFactory.generate(constants.errors.invalid_credentials, null)
                callback(callbackFactory.error(error, constants.responses.auth))
                return
              } else {
                module.exports.createByID(rows[0].id, databaseName, function (result) {
                  callback(result)
                })
              }
            })
          })
        })
      })
    })
  },

  /**
   * Create a new session or update an existing one. This method is only invoked by auth.create, which is why nothing is validated.
   * @param  {Integer}   userID       ID of the user
   * @param  {String}   databaseName name of the database
   * @param  {Function} callback     callback function
   * @return {void}
   */
  createByID: function (userID, databaseName, callback) {

    // pool database connection
    database.pool(databaseName).getConnection(function (err, connection) {

      // call back err if any
      if (err) {
        callback(callbackFactory.error(err, constants.responses.database))
        return
      }

      // check if old session can be reactivated
      connection.query('SELECT * FROM session WHERE userID = ?', [userID], function (err, rows) {

        // call back err if any
        if (err) {
          callback(callbackFactory.error(err, constants.responses.database))
          return
        }

        // generate new 30-day timestamp
        var newDate = new Date()
        newDate.setDate(newDate.getDate() + 30)
        var newTimestamp = newDate.toISOString().slice(0, 19).replace('T', ' ')

        // create new session if none was found
        if (rows.length === 0) {

          // generate new token
          var newToken = crypto.randomBytes(25).toString('hex')
          var shaToken = crypto.createHash('sha256').update(newToken).digest('hex')

          // insert new session into database
          connection.query('INSERT INTO session SET ?', { userID: userID, token: shaToken, validUntil: newTimestamp }, function (err) {

            // call back err if any
            if (err) {
              callback(callbackFactory.error(err, constants.responses.database))
              return
            }

            // get user data
            connection.query('SELECT * FROM user WHERE id = ?', [userID], function (err, rows) {

              // call back err if any
              if (err) {
                callback(callbackFactory.error(err, constants.responses.database))
                return
              }

              // call back token and user data
              callback(callbackFactory.single({
                userID: userID,
                type: rows[0].type,
                token: shaToken
              }, constants.responses.auth))
            })
          })
          return
        } else {

          // get existing session and update validUntil field
          var id = rows[0].id
          var token = rows[0].token

          connection.query('UPDATE session SET validUntil = ? WHERE id = ?', [newTimestamp, id], function (err) {

            // call back err if any
            if (err) {
              callback(callbackFactory.error(err, constants.responses.database))
              return
            }

            // get user data
            connection.query('SELECT * FROM user WHERE id = ?', [userID], function (err, rows) {

              // call back err if any
              if (err) {
                callback(callbackFactory.error(err, constants.responses.database))
                return
              }

              // call back re-validated token and user data
              callback(callbackFactory.single({
                userID: userID,
                type: rows[0].type,
                token: token
              }, constants.responses.auth))
            })
            return
          })
        }
      })
    })
  },

  /**
   * delete a session
   * @param  {Integer}  userID       ID of the user
   * @param  {String}   token        token of the user
   * @param  {String}   databaseName name of the database
   * @param  {Function} callback     callback function
   * @return {void}
   */
  delete: function (userID, token, databaseName, callback) {

    // validate databaseName
    databaseValidator.name(databaseName, function (result) {
      if (errorFactory.containsError(result)) {
        callback(result)
        return
      }

      // validate userID
      userValidator.id(userID, function (result) {
        if (errorFactory.containsError(result)) {
          callback(result)
          return
        }

        // validate token
        authValidator.token(token, function (result) {
          if (errorFactory.containsError(result)) {
            callback(result)
            return
          }

          // pool connection
          database.pool(databaseName).getConnection(function (err, connection) {

            // call back err if any
            if (err) {
              callback(callbackFactory.error(err, constants.responses.database))
              return
            }

            // delete session
            connection.query('DELETE FROM session WHERE userID = ? AND token = ?', [userID, token], function (err) {

              // call back err if any
              if (err) {
                callback(callbackFactory.error(err, constants.responses.database))
                return
              } else {
                callback(callbackFactory.error('none', constants.response.auth))
              }
            })
          })
        })
      })
    })
  },

  /**
   * remove session of a user
   * @param  {Integer}  userID       ID of the user
   * @param  {String}   databaseName name of the database
   * @param  {Function} callback     callback function
   * @return {void}
   */
  removeFromUser: function (userID, databaseName, callback) {

    // validate databaseName
    databaseValidator.name(databaseName, function (result) {
      if (errorFactory.containsError(result)) {
        callback(result)
        return
      }

      // validate userID
      userValidator.id(userID, function (result) {
        if (errorFactory.containsError(result)) {
          callback(result)
          return
        }
      })

      // pool database connection
      database.pool(databaseName).getConnection(function (err, connection) {

        // call back err if any
        if (err) {
          callback(callbackFactory.error(err, constants.responses.database))
          return
        }

        // delete session
        connection.query('DELETE FROM session WHERE userID = ?', [userID], function (err) {
          // call back err if any
          if (err) {
            callback(callbackFactory.error(err, constants.responses.database))
            return
          } else {
            callback(callbackFactory.error('none', constants.response.auth))
          }
        })
      })
    })
  }
}
