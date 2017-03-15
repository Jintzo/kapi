// load constants
var constants = require('./../conf/constants')

module.exports = {

  /**
   * generate a new error message.
   * @param  {Object} error      error object
   * @param  {Object} parameters error parameters
   * @return {String}            text of the error
   */
  generate: function (error, parameters) {

    // set error text to default (unknown error)
    var errorText = constants.name_unknown_error

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
      var replacement = constants.name_undefined_parameter
      if (typeof parameters !== 'undefined' && parameters !== null && typeof parameters[error.parameters[i]] !== 'undefined') {
        replacement = parameters[error.parameters[i]]
      }

      // replace entrypoint with replacement
      errorText = errorText.replace('~' + error.parameters[i], replacement)
    }

    return errorText
  }
}
