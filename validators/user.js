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
  },

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
