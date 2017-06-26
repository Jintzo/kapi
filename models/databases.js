// load required modules
const errorFactory = require('./../factories/error')
const database = require('./../database')
const constants = require('./../conf/constants')

// load required validators
const databaseValidator = require('./../validators/database')

module.exports = {

  /**
   * call back stats on the provided database
   * @param  {String}   databaseName name of the database
   * @param  {Function} callback     callback function
   * @return {void}
   */
  stats: function (databaseName, callback) {

    // validate database name
    databaseValidator.name(databaseName, function (result) {
      if (errorFactory.containsError(result)) {
        callback(result)
        return
      }

      // get connection
      let connection = database.getConnection(databaseName)

      let size = ''
      let sampleCount = ''
      let particleCount = ''

      // get database size
      connection.query('SELECT table_schema, sum( data_length + index_length ) / 1024 / 1024 as size FROM information_schema.TABLES WHERE table_schema = ? GROUP BY table_schema', [databaseName], function (error, rows) {

        // call back err if any
        if (error) {
          console.log('killing connection')
          connection.end()
          callback({ error })
          return
        }

        size = Math.round(rows[0].size * 10) / 10

        // get sample count
        connection.query('SELECT COUNT(*) AS count FROM probe', function (error, rows) {

          // call back err if any
          if (error) {
            console.log('killing connection')
            connection.end()
            callback({ error })
            return
          }

          sampleCount = rows[0].count

          // get particle count
          connection.query('SELECT COUNT(*) AS count FROM daten', function (error, rows) {
            console.log('killing connection')
            connection.end()

            // call back err if any
            if (error) {
              callback({ error })
              return
            }

            particleCount = rows[0].count

            // return data
            callback({
              size, sampleCount, particleCount
            })
            return
          })
        })
      })
    })
  },

  /**
   * call back available databases
   * @param  {Function} callback callback function
   * @return {void}
   */
  available: function (callback) {
    callback(constants.database.available)
  }
}
