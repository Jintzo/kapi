// load chai
const should = require('chai').should()

// load modules to be tested
const userValidator = require('./../validators/user')
const databaseValidator = require('./../validators/database')
const authValidator = require('./../validators/auth')

// describe user validator
describe('user validator', function () {

  describe('#id(id, callback)', function () {

    it('should return an error if no id is defined', function (done) {
      userValidator.id(null, function (result) {

        // basic checks
        should.exist(result)
        result.should.be.a('object')

        // structure checks
        result.should.have.property('errors')
        result.errors.should.be.a('array')
        result.errors.should.have.length(1)
        result.errors[0].should.be.a('object')

        // title checks
        result.errors[0].should.have.property('title')
        result.errors[0].title.should.be.a('string')
        result.errors[0].title.should.equal('response-validate')

        // detail checks
        result.errors[0].should.have.property('detail')
        result.errors[0].detail.should.be.a('string')
        result.errors[0].detail.should.equal('id is not defined')
        done()
      })
    })

    it('should return an error if empty id is defined', function (done) {
      userValidator.id('', function (result) {

        // basic checks
        should.exist(result)
        result.should.be.a('object')

        // structure checks
        result.should.have.property('errors')
        result.errors.should.be.a('array')
        result.errors.should.have.length(1)
        result.errors[0].should.be.a('object')

        // title checks
        result.errors[0].should.have.property('title')
        result.errors[0].title.should.be.a('string')
        result.errors[0].title.should.equal('response-validate')

        // detail checks
        result.errors[0].should.have.property('detail')
        result.errors[0].detail.should.be.a('string')
        result.errors[0].detail.should.equal('id is too short')
        done()
      })
    })

    it('should return an error if id is longer than 11 chars', function (done) {
      userValidator.id('123456789012', function (result) {

        // basic checks
        should.exist(result)
        result.should.be.a('object')

        // structure checks
        result.should.have.property('errors')
        result.errors.should.be.a('array')
        result.errors.should.have.length(1)
        result.errors[0].should.be.a('object')

        // title checks
        result.errors[0].should.have.property('title')
        result.errors[0].title.should.be.a('string')
        result.errors[0].title.should.equal('response-validate')

        // detail checks
        result.errors[0].should.have.property('detail')
        result.errors[0].detail.should.be.a('string')
        result.errors[0].detail.should.equal('id is too long')
        done()
      })
    })

    it('should return an error if id is not an integer', function (done) {
      userValidator.id('abc', function (result) {

        // basic checks
        should.exist(result)
        result.should.be.a('object')

        // structure checks
        result.should.have.property('errors')
        result.errors.should.be.a('array')
        result.errors.should.have.length(1)
        result.errors[0].should.be.a('object')

        // title checks
        result.errors[0].should.have.property('title')
        result.errors[0].title.should.be.a('string')
        result.errors[0].title.should.equal('response-validate')

        // detail checks
        result.errors[0].should.have.property('detail')
        result.errors[0].detail.should.be.a('string')
        result.errors[0].detail.should.equal('invalid id')
        done()
      })
    })

    it('should return no error otherwise', function (done) {
      userValidator.id(123, function (result) {

        // basic checks
        should.exist(result)
        result.should.be.a('object')

        // structure checks
        result.should.have.property('errors')
        result.errors.should.be.a('array')
        result.errors.should.have.length(1)
        result.errors[0].should.be.a('object')

        // title checks
        result.errors[0].should.have.property('title')
        result.errors[0].title.should.be.a('string')
        result.errors[0].title.should.equal('response-validate')

        // detail checks
        result.errors[0].should.have.property('detail')
        result.errors[0].detail.should.be.a('string')
        result.errors[0].detail.should.equal('none')
        done()
      })
    })
  })

  describe('#password(password, callback)', function () {

    it('should return an error if no password is defined', function (done) {
      userValidator.password(null, function (result) {

        // basic checks
        should.exist(result)
        result.should.be.a('object')

        // structure checks
        result.should.have.property('errors')
        result.errors.should.be.a('array')
        result.errors.should.have.length(1)
        result.errors[0].should.be.a('object')

        // title checks
        result.errors[0].should.have.property('title')
        result.errors[0].title.should.be.a('string')
        result.errors[0].title.should.equal('response-validate')

        // detail checks
        result.errors[0].should.have.property('detail')
        result.errors[0].detail.should.be.a('string')
        result.errors[0].detail.should.equal('password is not defined')
        done()
      })
    })

    it('should return an error if password is shorter than 8 characters', function (done) {
      userValidator.password('1234567', function (result) {

        // basic checks
        should.exist(result)
        result.should.be.a('object')

        // structure checks
        result.should.have.property('errors')
        result.errors.should.be.a('array')
        result.errors.should.have.length(1)
        result.errors[0].should.be.a('object')

        // title checks
        result.errors[0].should.have.property('title')
        result.errors[0].title.should.be.a('string')
        result.errors[0].title.should.equal('response-validate')

        // detail checks
        result.errors[0].should.have.property('detail')
        result.errors[0].detail.should.be.a('string')
        result.errors[0].detail.should.equal('password is too short')
        done()
      })
    })

    it('should return no error otherwise', function (done) {
      userValidator.password('üzügümülübrü', function (result) {

        // basic checks
        should.exist(result)
        result.should.be.a('object')

        // structure checks
        result.should.have.property('errors')
        result.errors.should.be.a('array')
        result.errors.should.have.length(1)
        result.errors[0].should.be.a('object')

        // title checks
        result.errors[0].should.have.property('title')
        result.errors[0].title.should.be.a('string')
        result.errors[0].title.should.equal('response-validate')

        // detail checks
        result.errors[0].should.have.property('detail')
        result.errors[0].detail.should.be.a('string')
        result.errors[0].detail.should.equal('none')
        done()
      })
    })
  })

  describe('#passwordHash', function () {

    it('should return an error if no passwordHash is defined', function (done) {
      userValidator.passwordHash(null, function (result) {

        // basic checks
        should.exist(result)
        result.should.be.a('object')

        // structure checks
        result.should.have.property('errors')
        result.errors.should.be.a('array')
        result.errors.should.have.length(1)
        result.errors[0].should.be.a('object')

        // title checks
        result.errors[0].should.have.property('title')
        result.errors[0].title.should.be.a('string')
        result.errors[0].title.should.equal('response-validate')

        // detail checks
        result.errors[0].should.have.property('detail')
        result.errors[0].detail.should.be.a('string')
        result.errors[0].detail.should.equal('passwordHash is not defined')
        done()
      })
    })

    it('should return an error if a passwordHash longer than 64 characters is defined', function (done) {
      userValidator.passwordHash('12345678901234567890123456789012345678901234567890123456789012345', function (result) {

        // basic checks
        should.exist(result)
        result.should.be.a('object')

        // structure checks
        result.should.have.property('errors')
        result.errors.should.be.a('array')
        result.errors.should.have.length(1)
        result.errors[0].should.be.a('object')

        // title checks
        result.errors[0].should.have.property('title')
        result.errors[0].title.should.be.a('string')
        result.errors[0].title.should.equal('response-validate')

        // detail checks
        result.errors[0].should.have.property('detail')
        result.errors[0].detail.should.be.a('string')
        result.errors[0].detail.should.equal('invalid passwordHash')
        done()
      })
    })

    it('should return an error if a passwordHash shorter than 64 characters is defined', function (done) {
      userValidator.passwordHash('123456789012345678901234567890123456789012345678901234567890123', function (result) {

        // basic checks
        should.exist(result)
        result.should.be.a('object')

        // structure checks
        result.should.have.property('errors')
        result.errors.should.be.a('array')
        result.errors.should.have.length(1)
        result.errors[0].should.be.a('object')

        // title checks
        result.errors[0].should.have.property('title')
        result.errors[0].title.should.be.a('string')
        result.errors[0].title.should.equal('response-validate')

        // detail checks
        result.errors[0].should.have.property('detail')
        result.errors[0].detail.should.be.a('string')
        result.errors[0].detail.should.equal('invalid passwordHash')
        done()
      })
    })

    it('should return an error if a passwordHash containing non-hexadecimal characters is defined', function (done) {
      userValidator.passwordHash('123456789012345678901234567890123456789012345678901234567890123g', function (result) {

        // basic checks
        should.exist(result)
        result.should.be.a('object')

        // structure checks
        result.should.have.property('errors')
        result.errors.should.be.a('array')
        result.errors.should.have.length(1)
        result.errors[0].should.be.a('object')

        // title checks
        result.errors[0].should.have.property('title')
        result.errors[0].title.should.be.a('string')
        result.errors[0].title.should.equal('response-validate')

        // detail checks
        result.errors[0].should.have.property('detail')
        result.errors[0].detail.should.be.a('string')
        result.errors[0].detail.should.equal('invalid passwordHash')
        done()
      })
    })

    it('should return no error otherwise', function (done) {
      userValidator.passwordHash('123456789012345678901234567890123456789012345678901234567890123f', function (result) {

        // basic checks
        should.exist(result)
        result.should.be.a('object')

        // structure checks
        result.should.have.property('errors')
        result.errors.should.be.a('array')
        result.errors.should.have.length(1)
        result.errors[0].should.be.a('object')

        // title checks
        result.errors[0].should.have.property('title')
        result.errors[0].title.should.be.a('string')
        result.errors[0].title.should.equal('response-validate')

        // detail checks
        result.errors[0].should.have.property('detail')
        result.errors[0].detail.should.be.a('string')
        result.errors[0].detail.should.equal('none')
        done()
      })
    })
  })

  describe('#mail(mail, callback)', function () {

    it('should return an error if no mail is defined', function (done) {
      userValidator.mail(null, function (result) {

        // basic checks
        should.exist(result)
        result.should.be.a('object')

        // structure checks
        result.should.have.property('errors')
        result.errors.should.be.a('array')
        result.errors.should.have.length(1)
        result.errors[0].should.be.a('object')

        // title checks
        result.errors[0].should.have.property('title')
        result.errors[0].title.should.be.a('string')
        result.errors[0].title.should.equal('response-validate')

        // detail checks
        result.errors[0].should.have.property('detail')
        result.errors[0].detail.should.be.a('string')
        result.errors[0].detail.should.equal('mail is not defined')
        done()
      })
    })

    it('should return an error if empty mail is defined', function (done) {
      userValidator.mail('', function (result) {

        // basic checks
        should.exist(result)
        result.should.be.a('object')

        // structure checks
        result.should.have.property('errors')
        result.errors.should.be.a('array')
        result.errors.should.have.length(1)
        result.errors[0].should.be.a('object')

        // title checks
        result.errors[0].should.have.property('title')
        result.errors[0].title.should.be.a('string')
        result.errors[0].title.should.equal('response-validate')

        // detail checks
        result.errors[0].should.have.property('detail')
        result.errors[0].detail.should.be.a('string')
        result.errors[0].detail.should.equal('invalid mail')
        done()
      })
    })

    it('should return an error if invalid mail is defined', function (done) {
      userValidator.mail('yolo@@web.de', function (result) {

        // basic checks
        should.exist(result)
        result.should.be.a('object')

        // structure checks
        result.should.have.property('errors')
        result.errors.should.be.a('array')
        result.errors.should.have.length(1)
        result.errors[0].should.be.a('object')

        // title checks
        result.errors[0].should.have.property('title')
        result.errors[0].title.should.be.a('string')
        result.errors[0].title.should.equal('response-validate')

        // detail checks
        result.errors[0].should.have.property('detail')
        result.errors[0].detail.should.be.a('string')
        result.errors[0].detail.should.equal('invalid mail')
        done()
      })
    })

    it('should return no error otherwise', function (done) {
      userValidator.mail('yolo@web.de', function (result) {

        // basic checks
        should.exist(result)
        result.should.be.a('object')

        // structure checks
        result.should.have.property('errors')
        result.errors.should.be.a('array')
        result.errors.should.have.length(1)
        result.errors[0].should.be.a('object')

        // title checks
        result.errors[0].should.have.property('title')
        result.errors[0].title.should.be.a('string')
        result.errors[0].title.should.equal('response-validate')

        // detail checks
        result.errors[0].should.have.property('detail')
        result.errors[0].detail.should.be.a('string')
        result.errors[0].detail.should.equal('none')
        done()
      })
    })
  })

  describe('#type(type, callback)', function () {

    it('should return an error if no type is defined', function (done) {
      userValidator.type(null, function (result) {

        // basic checks
        should.exist(result)
        result.should.be.a('object')

        // structure checks
        result.should.have.property('errors')
        result.errors.should.be.a('array')
        result.errors.should.have.length(1)
        result.errors[0].should.be.a('object')

        // title checks
        result.errors[0].should.have.property('title')
        result.errors[0].title.should.be.a('string')
        result.errors[0].title.should.equal('response-validate')

        // detail checks
        result.errors[0].should.have.property('detail')
        result.errors[0].detail.should.be.a('string')
        result.errors[0].detail.should.equal('type is not defined')
        done()
      })
    })

    it('should return an error if empty type is defined', function (done) {
      userValidator.type('', function (result) {

        // basic checks
        should.exist(result)
        result.should.be.a('object')

        // structure checks
        result.should.have.property('errors')
        result.errors.should.be.a('array')
        result.errors.should.have.length(1)
        result.errors[0].should.be.a('object')

        // title checks
        result.errors[0].should.have.property('title')
        result.errors[0].title.should.be.a('string')
        result.errors[0].title.should.equal('response-validate')

        // detail checks
        result.errors[0].should.have.property('detail')
        result.errors[0].detail.should.be.a('string')
        result.errors[0].detail.should.equal('invalid type')
        done()
      })
    })

    it('should return an error if invalid type is specified', function (done) {
      userValidator.type('slave', function (result) {

        // basic checks
        should.exist(result)
        result.should.be.a('object')

        // structure checks
        result.should.have.property('errors')
        result.errors.should.be.a('array')
        result.errors.should.have.length(1)
        result.errors[0].should.be.a('object')

        // title checks
        result.errors[0].should.have.property('title')
        result.errors[0].title.should.be.a('string')
        result.errors[0].title.should.equal('response-validate')

        // detail checks
        result.errors[0].should.have.property('detail')
        result.errors[0].detail.should.be.a('string')
        result.errors[0].detail.should.equal('invalid type')
        done()
      })
    })

    it('should return no error otherwise', function (done) {
      userValidator.type('1', function (result) {

        // basic checks
        should.exist(result)
        result.should.be.a('object')

        // structure checks
        result.should.have.property('errors')
        result.errors.should.be.a('array')
        result.errors.should.have.length(1)
        result.errors[0].should.be.a('object')

        // title checks
        result.errors[0].should.have.property('title')
        result.errors[0].title.should.be.a('string')
        result.errors[0].title.should.equal('response-validate')

        // detail checks
        result.errors[0].should.have.property('detail')
        result.errors[0].detail.should.be.a('string')
        result.errors[0].detail.should.equal('none')
        done()
      })
    })
  })

  describe('#confirmed(confirmed, callback)', function () {

    it('should return an error if no confirmed is specified', function (done) {
      userValidator.confirmed(null, function (result) {

        // basic checks
        should.exist(result)
        result.should.be.a('object')

        // structure checks
        result.should.have.property('errors')
        result.errors.should.be.a('array')
        result.errors.should.have.length(1)
        result.errors[0].should.be.a('object')

        // title checks
        result.errors[0].should.have.property('title')
        result.errors[0].title.should.be.a('string')
        result.errors[0].title.should.equal('response-validate')

        // detail checks
        result.errors[0].should.have.property('detail')
        result.errors[0].detail.should.be.a('string')
        result.errors[0].detail.should.equal('confirmed is not defined')
        done()
      })
    })

    it('should return an error if empty confirmed is specified', function (done) {
      userValidator.confirmed('', function (result) {

        // basic checks
        should.exist(result)
        result.should.be.a('object')

        // structure checks
        result.should.have.property('errors')
        result.errors.should.be.a('array')
        result.errors.should.have.length(1)
        result.errors[0].should.be.a('object')

        // title checks
        result.errors[0].should.have.property('title')
        result.errors[0].title.should.be.a('string')
        result.errors[0].title.should.equal('response-validate')

        // detail checks
        result.errors[0].should.have.property('detail')
        result.errors[0].detail.should.be.a('string')
        result.errors[0].detail.should.equal('invalid confirmed')
        done()
      })
    })

    it('shold return no error if confirmed is 0 (Integer)', function (done) {
      userValidator.confirmed(0, function (result) {

        // basic checks
        should.exist(result)
        result.should.be.a('object')

        // structure checks
        result.should.have.property('errors')
        result.errors.should.be.a('array')
        result.errors.should.have.length(1)
        result.errors[0].should.be.a('object')

        // title checks
        result.errors[0].should.have.property('title')
        result.errors[0].title.should.be.a('string')
        result.errors[0].title.should.equal('response-validate')

        // detail checks
        result.errors[0].should.have.property('detail')
        result.errors[0].detail.should.be.a('string')
        result.errors[0].detail.should.equal('none')
        done()
      })
    })

    it('should return no error if confirmed is 1 (Integer)', function (done) {
      userValidator.confirmed(1, function (result) {

        // basic checks
        should.exist(result)
        result.should.be.a('object')

        // structure checks
        result.should.have.property('errors')
        result.errors.should.be.a('array')
        result.errors.should.have.length(1)
        result.errors[0].should.be.a('object')

        // title checks
        result.errors[0].should.have.property('title')
        result.errors[0].title.should.be.a('string')
        result.errors[0].title.should.equal('response-validate')

        // detail checks
        result.errors[0].should.have.property('detail')
        result.errors[0].detail.should.be.a('string')
        result.errors[0].detail.should.equal('none')
        done()
      })
    })

    it('should return no error if confirmed is 0 (String)', function (done) {
      userValidator.confirmed('0', function (result) {

        // basic checks
        should.exist(result)
        result.should.be.a('object')

        // structure checks
        result.should.have.property('errors')
        result.errors.should.be.a('array')
        result.errors.should.have.length(1)
        result.errors[0].should.be.a('object')

        // title checks
        result.errors[0].should.have.property('title')
        result.errors[0].title.should.be.a('string')
        result.errors[0].title.should.equal('response-validate')

        // detail checks
        result.errors[0].should.have.property('detail')
        result.errors[0].detail.should.be.a('string')
        result.errors[0].detail.should.equal('none')
        done()
      })
    })

    it('should return no error if confirmed is 1 (String)', function (done) {
      userValidator.confirmed('1', function (result) {

        // basic checks
        should.exist(result)
        result.should.be.a('object')

        // structure checks
        result.should.have.property('errors')
        result.errors.should.be.a('array')
        result.errors.should.have.length(1)
        result.errors[0].should.be.a('object')

        // title checks
        result.errors[0].should.have.property('title')
        result.errors[0].title.should.be.a('string')
        result.errors[0].title.should.equal('response-validate')

        // detail checks
        result.errors[0].should.have.property('detail')
        result.errors[0].detail.should.be.a('string')
        result.errors[0].detail.should.equal('none')
        done()
      })
    })
  })
})

describe('database validator', function () {

  describe('#name(name, callback)', function () {

    it('should return an error if no name is defined', function (done) {
      databaseValidator.name(null, function (result) {

        // basic checks
        should.exist(result)
        result.should.be.a('object')

        // structure checks
        result.should.have.property('errors')
        result.errors.should.be.a('array')
        result.errors.should.have.length(1)
        result.errors[0].should.be.a('object')

        // title checks
        result.errors[0].should.have.property('title')
        result.errors[0].title.should.be.a('string')
        result.errors[0].title.should.equal('response-validate')

        // detail checks
        result.errors[0].should.have.property('detail')
        result.errors[0].detail.should.be.a('string')
        result.errors[0].detail.should.equal('database is not defined')
        done()
      })
    })

    it('should return an error if name is not on name list', function (done) {
      databaseValidator.name(123, function (result) {

        // basic checks
        should.exist(result)
        result.should.be.a('object')

        // structure checks
        result.should.have.property('errors')
        result.errors.should.be.a('array')
        result.errors.should.have.length(1)
        result.errors[0].should.be.a('object')

        // title checks
        result.errors[0].should.have.property('title')
        result.errors[0].title.should.be.a('string')
        result.errors[0].title.should.equal('response-validate')

        // detail checks
        result.errors[0].should.have.property('detail')
        result.errors[0].detail.should.be.a('string')
        result.errors[0].detail.should.equal('invalid database')
        done()
      })
    })

    it('should return no error otherwise', function (done) {
      databaseValidator.name('development', function (result) {

        // basic checks
        should.exist(result)
        result.should.be.a('object')

        // structure checks
        result.should.have.property('errors')
        result.errors.should.be.a('array')
        result.errors.should.have.length(1)
        result.errors[0].should.be.a('object')

        // title checks
        result.errors[0].should.have.property('title')
        result.errors[0].title.should.be.a('string')
        result.errors[0].title.should.equal('response-validate')

        // detail checks
        result.errors[0].should.have.property('detail')
        result.errors[0].detail.should.be.a('string')
        result.errors[0].detail.should.equal('none')
        done()
      })
    })
  })
})

describe('auth validator', function () {

  describe('#token(token, callback)', function () {

    it('should return an error if no token is defined', function (done) {
      authValidator.token(null, function (result) {

        // basic checks
        should.exist(result)
        result.should.be.a('object')

        // structure checks
        result.should.have.property('errors')
        result.errors.should.be.a('array')
        result.errors.should.have.length(1)
        result.errors[0].should.be.a('object')

        // title checks
        result.errors[0].should.have.property('title')
        result.errors[0].title.should.be.a('string')
        result.errors[0].title.should.equal('response-validate')

        // detail checks
        result.errors[0].should.have.property('detail')
        result.errors[0].detail.should.be.a('string')
        result.errors[0].detail.should.equal('token is not defined')
        done()
      })
    })

    it('should return an error if a token longer than 64 characters is defined', function (done) {
      authValidator.token('12345678901234567890123456789012345678901234567890123456789012345', function (result) {

        // basic checks
        should.exist(result)
        result.should.be.a('object')

        // structure checks
        result.should.have.property('errors')
        result.errors.should.be.a('array')
        result.errors.should.have.length(1)
        result.errors[0].should.be.a('object')

        // title checks
        result.errors[0].should.have.property('title')
        result.errors[0].title.should.be.a('string')
        result.errors[0].title.should.equal('response-validate')

        // detail checks
        result.errors[0].should.have.property('detail')
        result.errors[0].detail.should.be.a('string')
        result.errors[0].detail.should.equal('invalid token')
        done()
      })
    })

    it('should return an error if a token shorter than 64 characters is defined', function (done) {
      authValidator.token('123456789012345678901234567890123456789012345678901234567890123', function (result) {

        // basic checks
        should.exist(result)
        result.should.be.a('object')

        // structure checks
        result.should.have.property('errors')
        result.errors.should.be.a('array')
        result.errors.should.have.length(1)
        result.errors[0].should.be.a('object')

        // title checks
        result.errors[0].should.have.property('title')
        result.errors[0].title.should.be.a('string')
        result.errors[0].title.should.equal('response-validate')

        // detail checks
        result.errors[0].should.have.property('detail')
        result.errors[0].detail.should.be.a('string')
        result.errors[0].detail.should.equal('invalid token')
        done()
      })
    })

    it('should return an error if a token containing non-hexadecimal characters is defined', function (done) {
      authValidator.token('123456789012345678901234567890123456789012345678901234567890123g', function (result) {

        // basic checks
        should.exist(result)
        result.should.be.a('object')

        // structure checks
        result.should.have.property('errors')
        result.errors.should.be.a('array')
        result.errors.should.have.length(1)
        result.errors[0].should.be.a('object')

        // title checks
        result.errors[0].should.have.property('title')
        result.errors[0].title.should.be.a('string')
        result.errors[0].title.should.equal('response-validate')

        // detail checks
        result.errors[0].should.have.property('detail')
        result.errors[0].detail.should.be.a('string')
        result.errors[0].detail.should.equal('invalid token')
        done()
      })
    })

    it('should return no error otherwise', function (done) {
      authValidator.token('123456789012345678901234567890123456789012345678901234567890123f', function (result) {

        // basic checks
        should.exist(result)
        result.should.be.a('object')

        // structure checks
        result.should.have.property('errors')
        result.errors.should.be.a('array')
        result.errors.should.have.length(1)
        result.errors[0].should.be.a('object')

        // title checks
        result.errors[0].should.have.property('title')
        result.errors[0].title.should.be.a('string')
        result.errors[0].title.should.equal('response-validate')

        // detail checks
        result.errors[0].should.have.property('detail')
        result.errors[0].detail.should.be.a('string')
        result.errors[0].detail.should.equal('none')
        done()
      })
    })
  })
})
