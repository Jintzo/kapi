process.env.NODE_ENV = 'test'

// dependencies
let chai = require('chai')
const should = require('chai').should()
const chaiHttp = require('chai-http')
const app = require('../../app')
chai.use(chaiHttp)

describe('samples route', () => {

  describe('GET /:id', () => {

    it('should return error if invalid database is specified')

    it('should return error if invalid token is specified')

    it('should return error if invalid id is specified')

    it('should return sample object if everything is ok')
  })

  describe('POST /', () => {

    it('should return error if invalid database is specified')

    it('should return error if invalid token is specified')

    it('should return error if invalid project id is specified')

    it('should return error if invalid name is specified')

    it('should return error if invalid description is specified')

    it('should return a sample object if everything is ok')
  })

  describe('PUT /:id', () => {

    it('should return error if invalid database is specified')

    it('should return error if invalid token is specified')

    it('should return error if invalid sample id is specified')

    it('should return error if no parameters are specified')

    it('should return error if parameter key contains other characters than small letters and underscore')

    it('should return error if parameter key is longer than default field length')

    it('should return error if parameter value is not real number')

    it('should return error if parameter value is longer than default field length')

    it('should return updated sample object if everything is ok')
  })

  describe('DELETE /:id', () => {

    it('should return error if invalid database is specified')

    it('should return error if invalid token is specified')

    it('should return error if invalid id is specified')

    it('should return message if everything is ok')
  })

  describe('GET /:id/txt', () => {

    it('should return error if invalid database is specified')

    it('should return error if invalid token is specified')

    it('should return error if invalid id is specified')

    it('should return txt file if everything is ok')
  })

  describe('GET /:id/medians', () => {

    it('should return error if invalid database is specified')

    it('should return error if invalid token is specified')

    it('should return error if invalid id is specified')

    it('should return csv file if everything is ok')
  })

  describe('GET /:id/diagrams', () => {

    it('should return error if invalid database is specified')

    it('should return error if invalid token is specified')

    it('should return error if invalid id is specified')

    it('should return diagram object if everything is ok')
  })

  describe('GET /:id/report', () => {

    it('should return error if invalid database is specified')

    it('should return error if invalid token is specified')

    it('should return error if invalid id is specified')

    it('should return pdf file if everything is ok')
  })
})
