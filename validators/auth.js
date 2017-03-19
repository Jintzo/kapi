// load needed modules
var constants = require('./../conf/constants')
var callbackFactory = require('./../factories/callback')
var errorFactory = require('./../factories/error')

module.exports = {

  /**
   * validate a token
   * @param  {String}   token token to be validated
   * @param  {Function} callback     callback function
   * @return {void}
   */
  token: function (token, callback) {

    // check that the token is defined
    if (typeof token === 'undefined' || token === null) {
      const error = errorFactory.generate(constants.errors.not_defined, {thing: 'token'})
      callback(callbackFactory.error(error, constants.responses.validate))
      return
    }

    // convert to string
    token = token.toString()

    // check if token is a SHA-256 hash
    if (!token.match(/^[a-fA-F0-9]{64}$/)) {
      const error = errorFactory.generate(constants.errors.wrong_format, {thing: 'token'})
      callback(callbackFactory.error(error, constants.responses.validate))
      return
    }

    // valid
    callback(callbackFactory.error('none', constants.responses.validate))
    return
  }
}
