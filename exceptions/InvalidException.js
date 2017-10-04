class InvalidException extends Error {

  constructor (...args) {
    super(...args)
    this.name = this.constructor.name
    Error.captureStackTrace(this, InvalidException)
  }
}

module.exports = InvalidException
