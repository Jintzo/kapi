process.env.NODE_ENV = 'test'

// dependencies
let chai = require('chai')
const should = require('chai').should()
const chaiHttp = require('chai-http')
const app = require('../../app')
chai.use(chaiHttp)

describe('fractions route', () => {

  describe('GET /:id', () => {

    it('should return error if invalid database is specified')

    it('should return error if invalid token is specified')

    it('should return error if invalid id is specified')

    it('should return fraction object if everything is ok')
  })

  describe('POST /', () => {

    it('should return error if invalid database is specified')

    it('should return error if invalid token is specified')

    it('should return error if invalid sample id is specified')

    it('should return error if invalid sieve is specified')

    it('should return error if invalid throughput is specified')

    it('should return error if invalid corrected throughput is specified')

    it('should return new fraction object if everything is ok and no corrected throughput is specified')

    it('should return new fraction object if everything is ok and a corrected throughput is specified')
  })

  describe('PUT /:id', () => {

    it('should return error if invalid database is specified')

    it('should return error if invalid token is specified')

    it('should return error if invalid id is specified')

    it('should return error if no arguments are specified')

    it('should return error if invalid corrected throughput is specified')

    it('should return updated fraction object if everything is ok')
  })

  describe('DELETE /:id', () => {

    it('should return error if invalid database is specified')

    it('should return error if invalid token is specified')

    it('should return error if invalid id is specified')

    it('should return message if everything is ok')
  })

  describe('GET /:id/medians', () => {

    it('should return error if invalid database is specified')

    it('should return error if invalid token is specified')

    it('should return error if invalid id is specified')

    it('should return csv file if everything is ok')
  })

  describe('GET /:id/report', () => {

    it('should return error if invalid database is specified')

    it('should return error if invalid token is specified')

    it('should return error if invalid id is specified')

    it('should return pdf file if everything is ok')
  })
})
