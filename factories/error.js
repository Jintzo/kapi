// load constants
var constants = require('./../conf/constants')

module.exports = {

  /**
   * generate a new error message.
   *
   * @param  {Object} error      error object
   * @param  {Object} parameters error parameters
   * @return {String}            text of the error
   */
  generate: function (error, parameters) {

    // set error text to default (unknown error)
    var errorText = constants.errors.unknown.text

    // return if no error is provided
    if (typeof error === 'undefined' || error === null) {
      return errorText
    }

    // check that the error contains all needed parts - return default error if not
    if (typeof error.text === 'undefined' || typeof error.parameters === 'undefined') {
      return errorText
    }

    // load acutal errorText
    errorText = error.text

    // replace all entrypoints with parameters, if defined
    for (var i = 0; i < error.parameters.length; i++) {

      // load replacement - if not defined, switch to default
      var replacement = constants.errors.placeholder_undefined
      if (typeof parameters !== 'undefined' && parameters !== null && typeof parameters[error.parameters[i]] !== 'undefined') {
        replacement = parameters[error.parameters[i]]
      }

      // replace entrypoint with replacement
      errorText = errorText.replace('~' + error.parameters[i], replacement)
    }

    return errorText
  },

  /**
   * checks if a error callback object is an error or not
   *
   * @param  {Object}  error the error callback object to be verified
   * @return {Boolean}               whether or not the provided callback object contains an error
   */
  containsError: function (error) {
    return (typeof error === 'object' &&
      Array.isArray(error.errors) &&
      error.errors.length >= 1 &&
      typeof error.errors[0] === 'object' &&
      typeof error.errors[0].detail === 'string' &&
      error.errors[0].detail !== 'none')
  }
}
