class TooShortException extends Error {

  constructor (specifier = 'unknown', actualLength = 'unkown', minimumLength = 1) {
    super(`${specifier} is too short (length ${actualLength}, min ${minimumLength})`)
    this.name = this.constructor.name
    Error.captureStackTrace(this, TooShortException)
  }
}

module.exports = TooShortException
