const config = require('../config/config')

class TooLongException extends Error {

  constructor (specifier = 'unknown', actualLength = 'unkown', maximumLength = config.lengths.default) {
    super(`${specifier} is too long (length ${actualLength}, max ${maximumLength})`)
    this.name = this.constructor.name
    Error.captureStackTrace(this, TooLongException)
  }
}

module.exports = TooLongException
