// load required modules
var mysql = require('mysql')
var credentials = require('./conf/credentials')

let getConnection = function (database) {
  console.log('creating new connection')
  let connection = mysql.createConnection({
    host: credentials.host,
    user: credentials.user,
    password: credentials.password,
    database: database
  })
  connection.connect()
  return connection
}

exports.connection = getConnection
