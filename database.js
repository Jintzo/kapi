// load required modules
var mysql = require('mysql')
var credentials = require('./conf/credentials')
var constants = require('./conf/constants')

// generate connection pool
let pool = function (database) {
  return mysql.createPool({
    connectionLimit: constants.database.max_connections,
    host: credentials.host,
    user: credentials.user,
    password: credentials.password,
    database: database
  })
}
exports.pool = pool
