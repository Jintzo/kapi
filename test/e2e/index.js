process.env.NODE_ENV = 'test'

// dependencies
let chai = require('chai')
const should = require('chai').should()
const chaiHttp = require('chai-http')
const app = require('../../app')
chai.use(chaiHttp)

describe('index route', () => {

  describe('GET /', () => {

    it('should return a list of subroutes', done => {
      chai.request(app).get('/').end((err, res) => {
        should.exist(res)
        should.not.exist(err)
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('subroutes')
        res.body.subroutes.should.be.a('array')
        done()
      })
    })
  })

  describe('GET /medians', () => {

    it('should return an error if invalid database is specified')

    it('should return an error if invalid token is specified')

    it('should return csv file if everything is ok')
  })

  describe('GET /charts', () => {

    it('should return an error if invalid database is specified')

    it('should return an error if invalid token is specified')

    it('should return data object if everything is ok')
  })
})
