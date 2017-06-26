// load needed modules
var constants = require('./../conf/constants')
var errorFactory = require('./../factories/error')
var validator = require('validator')

module.exports = {

  /**
   * validate an id.
   *
   * @param  {Object}   id       the id to be validated
   * @param  {Function} callback callback function
   * @return {void}
   */
  id: function (id, callback) {

    // check that the id is defined
    if (typeof id === 'undefined' || id === null) {
      const error = errorFactory.generate(constants.errors.not_defined, {thing: 'id'})
      callback({ error })
      return
    }

    // convert to string
    id = id.toString()

    // check that the id isn't shorter than 1 character
    if (id.length < 1) {
      const error = errorFactory.generate(constants.errors.too_short, {thing: 'id'})
      callback({ error })
      return
    }

    // check that the id isn't longer than the default field length
    if (id.length > constants.lengths.default) {
      const error = errorFactory.generate(constants.errors.too_long, {thing: 'id'})
      callback({ error })
      return
    }

    // check that the id is an integer
    if (!validator.isInt(id)) {
      const error = errorFactory.generate(constants.errors.wrong_format, {thing: 'id'})
      callback({ error })
      return
    }

    // valid
    callback({ error: 'none' })
    return
  },

  /**
   * validate a name.
   *
   * @param  {String}   name     the name to be validated
   * @param  {Function} callback callback function
   * @return {void}
   */
  name: function (name, callback) {

    // check that name is defined
    if (typeof name === 'undefined' || name === null) {
      const error = errorFactory.generate(constants.errors.not_defined, {thing: 'name'})
      callback({ error })
      return
    }

    // convert to string
    name = name.toString()

    // check that the name isn't shorter than 1 character
    if (name.length < 1) {
      const error = errorFactory.generate(constants.errors.too_short, {thing: 'name'})
      callback({ error })
      return
    }

    // check that the name isn't longer than the default field length
    if (name.length > constants.lengths.default) {
      const error = errorFactory.generate(constants.errors.too_long, {thing: 'name'})
      callback({ error })
      return
    }

    // valid
    callback({ error: 'none' })
  }
}
