// load required modules
const mysql = require('mysql')
const credentials = require('./config/credentials')
const DatabaseValidator = require('./validators/database')

class Database {

  constructor (database = '') {

    console.log(`setting up new database, name: ${database}`)

    // validate database
    try {
      DatabaseValidator.name(database)
    } catch (error) {

      // throw up
      throw error
    }

    // set database
    this.database = database
  }

  get database () {
    return this.database
  }

  getConnection () {
    console.log(`creating new connection to database ${this.database}`)
    let connection = mysql.createConnection({
      host: credentials.host,
      user: credentials.user,
      password: credentials.password,
      database: this.database
    })
    connection.connect()
    return connection
  }
}

module.exports = Database
