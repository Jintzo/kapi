process.env.NODE_ENV = 'test'

// dependencies
let chai = require('chai')
const should = require('chai').should()
const chaiHttp = require('chai-http')
const app = require('../../app')
chai.use(chaiHttp)

describe('auth route', () => {

  describe('POST /login', () => {

    it('should return error if invalid database is specified')

    it('should return error if invalid username is specified')

    it('should return error if invalid password is specified')

    it('should return error if invalid username-password-combination is specified')

    it('should return token if valid username-password-combination is specified')
  })

  describe('POST /register', () => {

    it('should return error if invalid database is specified')

    it('should return error if invalid username is specified')

    it('should return error if existing username is specified')

    it('should return error if invalid password is specified')

    it('should return error if invalid passwordConfirm is specified')

    it('should return error if passwordConfirm does not match password')

    it('should return message if everything is ok')
  })

  describe('POST /logout', () => {

    it('should return error if invalid database is specified')

    it('should return no error if invalid token is specified')

    it('should return no error if valid token is specified')
  })
})