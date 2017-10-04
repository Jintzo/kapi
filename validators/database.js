// load needed modules
const config = require('./../config/config')
const InvalidException = require('../exceptions/InvalidException')

/**
 * validate database properties
 */
class DatabaseValidator {

  /**
   * validate a database name
   * @param  {String} name name of the database
   */
  static name (name = '') {
    if (config.database.available.indexOf(name) === -1) {
      throw new InvalidException('database name is not valid')
    }
  }
}

module.exports = DatabaseValidator
