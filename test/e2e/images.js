process.env.NODE_ENV = 'test'

// dependencies
let chai = require('chai')
const should = require('chai').should()
const chaiHttp = require('chai-http')
const app = require('../../app')
chai.use(chaiHttp)

describe('images route', () => {

  describe('GET /:id', () => {

    it('should return error if invalid database is specified')

    it('should return error if invalid token is specified')

    it('should return error if invalid id is specified')

    it('should return image object if everything is ok')
  })

  describe('POST /', () => {

    it('should return error if invalid database is specified')

    it('should return error if invalid token is specified')

    it('should return error if invalid fraction id is specified')

    it('should return error if invalid image number is specified')

    it('should return error if invalid image path is specified')

    it('should return new image object if everything is ok')
  })

  describe('DELETE /:id', () => {

    it('should return error if invalid database is specified')

    it('should return error if invalid token is specified')

    it('shold return error if invalid id is specified')

    it('should return message if everything is ok')
  })
})
