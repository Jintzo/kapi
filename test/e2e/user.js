process.env.NODE_ENV = 'test'

// dependencies
let chai = require('chai')
const should = require('chai').should()
const chaiHttp = require('chai-http')
const app = require('../../app')
chai.use(chaiHttp)

describe('user route', function () {

  describe('GET /:id', function () {

    it('should return an error if invalid database is specified')

    it('should return an error if invalid token is specified')

    it('should return an error if invalid id is specified')

    it('should return an error if token-holder is not requested user and not admin')

    it('should return no error otherwise')
  })
})
