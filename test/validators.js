// load chai
const should = require('chai').should()

// load modules to be tested
const userValidator = require('./../validators/user')
const databaseValidator = require('./../validators/database')
const authValidator = require('./../validators/auth')

// describe user validator
describe('user validator', function () {

  describe('#id(id, callback)', function () {

    it('should return an error if no id is defined')

    it('should return an error if empty id is defined')

    it('should return an error if id is longer than 11 chars')

    it('should return an error if id is not an integer')

    it('should return no error otherwise')
  })

  describe('#password(password, callback)', function () {

    it('should return an error if no password is defined')

    it('should return an error if password is shorter than 8 characters')

    it('should return no error otherwise')
  })

  describe('#passwordHash', function () {

    it('should return an error if no passwordHash is defined')

    it('should return an error if a passwordHash longer than 64 characters is defined')

    it('should return an error if a passwordHash shorter than 64 characters is defined')

    it('should return an error if a passwordHash containing non-hexadecimal characters is defined')

    it('should return no error otherwise')
  })

  describe('#mail(mail, callback)', function () {

    it('should return an error if no mail is defined')

    it('should return an error if empty mail is defined')

    it('should return an error if invalid mail is defined')

    it('should return no error otherwise')
  })

  describe('#type(type, callback)', function () {

    it('should return an error if no type is defined')

    it('should return an error if empty type is defined')

    it('should return an error if invalid type is specified')

    it('should return no error otherwise')
  })

  describe('#confirmed(confirmed, callback)', function () {

    it('should return an error if no confirmed is specified')

    it('should return an error if empty confirmed is specified')

    it('shold return no error if confirmed is 0 (Integer)')

    it('should return no error if confirmed is 1 (Integer)')

    it('should return no error if confirmed is 0 (String)')

    it('should return no error if confirmed is 1 (String)')
  })
})

describe('database validator', function () {

  describe('#name(name, callback)', function () {

    it('should return an error if no name is defined')

    it('should return an error if name is not on name list')

    it('should return no error otherwise')
  })
})

describe('auth validator', function () {

  describe('#token(token, callback)', function () {

    it('should return an error if no token is defined')

    it('should return an error if a token longer than 64 characters is defined')

    it('should return an error if a token shorter than 64 characters is defined')

    it('should return an error if a token containing non-hexadecimal characters is defined')

    it('should return no error otherwise')
  })
})
