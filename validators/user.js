// load needed modules
const config = require('../config/config')
const validator = require('validator')
const TooLongException = require('../exceptions/TooLongException')
const TooShortException = require('../exceptions/TooShortException')
const InvalidException = require('../exceptions/InvalidException')

class UserValidator {

  static id (id = '') {

    // convert to string
    id = id.toString()

    // check that length is >= min
    if (id.length < 1) {
      throw new TooShortException('id', id.length)
    }

    // check that length is <= max
    if (id.length > config.lengths.default) {
      throw new TooLongException('id', id.length)
    }

    // check that id is integer
    if (!validator.isInt(id)) {
      throw new InvalidException(`id '${id}' is not an integer`)
    }
  }

  static name (name = '') {

    // convert to string
    name = name.toString()

    // check that length is >= min
    if (name.length < config.lengths.user.name.min) {
      throw new TooShortException('name', name.length, config.lengths.user.name.min)
    }

    // check that length is <= max
    if (name.length > config.lengths.default) {
      throw new TooLongException('name', name.length, config.lengths.default)
    }
  }

  static mail (mail = '') {

    // convert to string
    mail = mail.toString()

    // check that length is <= max
    
  }
}

module.exports = UserValidator

module.exports = {

  /**
   * validate a mail
   * @param  {String}   mail     the mail to be validated
   * @param  {Function} callback callback function
   * @return {void}
   */
  mail: function (mail, callback) {

    // check that mail is defined
    if (typeof mail === 'undefined' || mail === null) {
      const error = errorFactory.generate(constants.errors.not_defined, {thing: 'mail'})
      callback({ error })
      return
    }

    // convert to string
    mail = mail.toString()

    // check that mail is correctly formatted
    if (!validator.isEmail(mail)) {
      const error = errorFactory.generate(constants.errors.invalid, {thing: 'mail'})
      callback({ error })
      return
    }

    // valid
    callback({ error: 'none' })
    return
  },

  /**
   * validate a password
   * @param  {String}   password password to be validated
   * @param  {Function} callback callback function
   * @return {void}
   */
  password: function (password, callback) {

    // check that password is defined
    if (typeof password === 'undefined' || password === null) {
      const error = errorFactory.generate(constants.errors.not_defined, {thing: 'password'})
      callback({ error })
      return
    }

    // convert to string
    password = password.toString()

    // check that password is correctly formatted
    if (password.length < 8) {
      const error = errorFactory.generate(constants.errors.too_short, {thing: 'password'})
      callback({ error })
      return
    }

    // valid
    callback({ error: 'none' })
    return
  },

  /**
   * validate a password hash
   * @param  {String}   passwordHash passwordHash to be validated
   * @param  {Function} callback     callback function
   * @return {void}
   */
  passwordHash: function (passwordHash, callback) {

    // check that the passwordHash is defined
    if (typeof passwordHash === 'undefined' || passwordHash === null) {
      const error = errorFactory.generate(constants.errors.not_defined, {thing: 'passwordHash'})
      callback({ error })
      return
    }

    // convert to string
    passwordHash = passwordHash.toString()

    // check if passwordHash is a SHA-256 hash
    if (!passwordHash.match(/^[a-fA-F0-9]{64}$/)) {
      const error = errorFactory.generate(constants.errors.wrong_format, {thing: 'passwordHash'})
      callback({ error })
      return
    }

    // valid
    callback({ error: 'none' })
    return
  },

  /**
   * validate user type
   * @param  {Integer}  type     type to be validated
   * @param  {Function} callback callback function
   * @return {void}
   */
  type: function (type, callback) {

    // check that type is defined
    if (typeof type === 'undefined' || type === null) {
      const error = errorFactory.generate(constants.errors.not_defined, {thing: 'type'})
      callback({ error })
      return
    }

    // convert to string
    type = type.toString()

    // check that type is in type list
    let valid = false
    for (var userType in constants.users.types) {
      let user = constants.users.types[userType]
      if (user.id.toString() === type) {
        valid = true
      }
    }
    if (!valid) {
      const error = errorFactory.generate(constants.errors.invalid, {thing: 'type'})
      callback({ error })
      return
    }

    // valid
    callback({ error: 'none' })
    return
  },

  /**
   * validate confirmation state
   * @param  {String}   confirmed confirmation state to be validated
   * @param  {Function} callback  callback function
   * @return {void}
   */
  confirmed: function (confirmed, callback) {

    // check that confirmed is defined
    if (typeof confirmed === 'undefined' || confirmed === null) {
      const error = errorFactory.generate(constants.errors.not_defined, {thing: 'confirmed'})
      callback({ error })
      return
    }

    // convert to string
    confirmed = confirmed.toString()

    // check that isSupervisor is either 0 or 1
    if (confirmed !== '0' && confirmed !== '1') {
      const error = errorFactory.generate(constants.errors.wrong_format, {thing: 'confirmed'})
      callback({ error })
      return
    }

    // valid
    callback({ error: 'none' })
    return
  }
}
