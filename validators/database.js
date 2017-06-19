// load needed modules
var constants = require('./../conf/constants')
var errorFactory = require('./../factories/error')

module.exports = {

  /**
   * validate a database name
   * @param  {String}   name     name to be validated
   * @param  {Function} callback callback function
   * @return {void}
   */
  name: function (name, callback) {

    // check that name is defined
    if (typeof name === 'undefined' || name === null) {
      const error = errorFactory.generate(constants.errors.not_defined, {thing: 'database'})
      callback({ error })
      return
    }

    // convert to string
    name = name.toString()

    // check that name is in name list
    if (constants.database.available.indexOf(name) === -1) {
      const error = errorFactory.generate(constants.errors.invalid, {thing: 'database'})
      callback({ error })
      return
    }

    // valid
    callback({ error: 'none' })
    return
  }
}
