process.env.NODE_ENV = 'test'

// dependencies
let chai = require('chai')
const should = require('chai').should()
const chaiHttp = require('chai-http')
const app = require('../../app')
chai.use(chaiHttp)

describe('databases route', function () {

  describe('GET /stats', function () {

    it('should return an error if invalid database is specified')

    it('should return an error if invalid token is specified')

    it('should return stats object if everything is ok')
  })

  describe('GET /available', function () {

    it('should return an array of available databases')
  })
})
