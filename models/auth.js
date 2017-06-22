// load needed modules
var crypto = require('crypto')
var errorFactory = require('./../factories/error')
var database = require('./../database')
var constants = require('./../conf/constants')

// load needed validators
var userValidator = require('./../validators/user')
var authValidator = require('./../validators/auth')
var databaseValidator = require('./../validators/database')

module.exports = {

  /**
   * verify that a token is still valid
   * @param  {String}   token        token
   * @param  {String}   databaseName name of the database
   * @param  {Function} callback     callback function
   * @return {void}
   */
  verify: function (token, databaseName, callback) {

    // validate database name
    databaseValidator.name(databaseName, function (result) {
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

        // pool database connection
        database.pool(databaseName).getConnection(function (error, connection) {

          // call back err if any
          if (error) {
            callback({ error })
            return
          }

          // check if entry exists in database
          connection.query('SELECT * FROM session WHERE token = ?', [token], function (error, rows) {
            connection.release()

            // call back err if any
            if (error) {
              callback({ error })
              return
            }

            if (rows.length === 0) {
              const error = errorFactory.generate(constants.errors.no_such, {thing: 'session'})
              callback({ error })
              return
            } else {

              // check if session is still valid
              var nowDate = new Date()
              var validUntilDate = new Date(Date.parse(rows[0].validUntil))
              var timeDifference = validUntilDate.getTime() - nowDate.getTime()

              if (timeDifference <= 0) {
                const error = errorFactory.generate(constants.errors.invalid, { thing: 'session' })
                callback({ error })
                return
              } else {
                callback({ error: 'none' })
                return
              }
            }
          })
        })
      })
    })
  },

  /**
   * create a new session or update an existing one
   * @param  {String}   name         name of the user
   * @param  {String}   password     password of the user
   * @param  {String}   databaseName name of the database
   * @param  {Function} callback     callback function
   * @return {void}
   */
  create: function (name, password, databaseName, callback) {

    // validate database name
    databaseValidator.name(databaseName, function (result) {
      if (errorFactory.containsError(result)) {
        callback(result)
        return
      }

      // validate name
      userValidator.name(name, function (result) {
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
              let error = ''
              const errorCode = err.code
              switch (errorCode) {
                case 'ENOTFOUND':
                  error = errorFactory.generate(constants.errors.not_reached, { thing: 'IBF database' })
                  callback({ error })
                  return
                default:
                  error = 'database connection error: ' + errorCode
                  callback({ error })
                  return
              }
            }

            // hash password
            var passwordHash = crypto.createHash('sha256').update(password).digest('hex')

            // get user ID
            connection.query('SELECT id FROM user WHERE name = ? AND passwordHash = ? AND confirmed = 1', [name, passwordHash], function (error, rows) {
              connection.release()

              // call back err if any
              if (error) {
                callback({ error })
                return
              }

              // name is unique, so only one or zero rows are possible
              if (rows.length === 0) {
                const error = errorFactory.generate(constants.errors.invalid, { thing: 'credentials' })
                callback({ error })
                return
              } else {
                module.exports.createByID(rows[0].id, databaseName, function (result) {
                  console.log('creating session for user id ' + rows[0].id)
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
    database.pool(databaseName).getConnection(function (error, connection) {

      // call back err if any
      if (error) {
        callback({ error })
        return
      }

      // check if old session can be reactivated
      connection.query('SELECT * FROM session WHERE userID = ?', [userID], function (error, rows) {

        // call back err if any
        if (error) {
          connection.release()
          callback({ error })
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
          connection.query('INSERT INTO session SET ?', { userID: userID, token: shaToken, validUntil: newTimestamp }, function (error) {

            // call back err if any
            if (error) {
              connection.release()
              callback({ error })
              return
            }

            // get user data
            connection.query('SELECT * FROM user WHERE id = ?', [userID], function (error, rows) {
              connection.release()

              // call back err if any
              if (error) {
                callback({ error })
                return
              }

              // call back token and user data
              callback({
                userID: userID,
                token: shaToken
              })
            })
          })
          return
        } else {

          // get existing session and update validUntil field
          var id = rows[0].id
          var token = rows[0].token

          connection.query('UPDATE session SET validUntil = ? WHERE id = ?', [newTimestamp, id], function (error) {

            // call back err if any
            if (error) {
              connection.release()
              callback({ error })
              return
            }

            // get user data
            connection.query('SELECT * FROM user WHERE id = ?', [userID], function (error, rows) {
              connection.release()

              // call back err if any
              if (error) {
                callback({ error })
                return
              }

              // call back re-validated token and user data
              callback({
                userID: userID,
                token: token
              })
            })
            return
          })
        }
      })
    })
  }
}
