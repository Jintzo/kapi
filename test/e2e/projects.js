process.env.NODE_ENV = 'test'

// dependencies
let chai = require('chai')
const should = require('chai').should()
const chaiHttp = require('chai-http')
const app = require('../../app')
chai.use(chaiHttp)

describe('project route', () => {

  describe('GET /', () => {

    it('should return an error if invalid database is specified')

    it('should return an error if invalid token is specified')

    it('should return an array of projects is everything is ok')
  })

  describe('GET /:id', () => {

    it('should return an error if invalid database is specified')

    it('should return an error if invalid token is specified')

    it('should return an error if invalid id is specified')

    it('should return a project object if everything is ok')
  })

  describe('POST /', () => {

    it('should return an error if invalid database is specified')

    it('should return an error if invalid token is specified')

    it('shold return an error if invalid name is specified')

    it('should return new project object if everything is ok')
  })

  describe('PUT /:id', () => {

    it('should return an error if invalid database is specified')

    it('should return an error if invalid token is specified')

    it('should return an error if invalid id is specified')

    it('should return an error if no parameters are specified')

    it('should return an error if invalid project name is specified')

    it('should return project object if everything is ok')
  })

  describe('DELETE /:id', () => {

    it('should return an error if invalid database is specified')

    it('should return an error if invalid token is specified')

    it('should return an error if invalid id is specified')

    it('should return an error if specified project is not empty')

    it('should return message if everything is ok')
  })
})
