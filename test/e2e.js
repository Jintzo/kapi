process.env.NODE_ENV = 'test'

// dependencies
let chai = require('chai')
let should = require('chai').should()
let chaiHttp = require('chai-http')
let app = require('../app')
chai.use(chaiHttp)

// //////////////
// INDEX ROUTE //
// //////////////
describe('index route', function () {

  describe('GET /', function () {

    it('should return a list of subroutes', function (done) {
      chai.request(app).get('/').end(function (err, res) {
        should.exist(res)
        should.not.exist(err)
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('data')
        res.body.data.should.be.a('object')
        res.body.data.should.have.property('attributes')
        res.body.data.attributes.should.be.a('object')
        res.body.data.attributes.should.have.property('subroutes')
        res.body.data.attributes.subroutes.should.be.a('array')
        done()
      })
    })
  })
})

// /////////////
// AUTH ROUTE //
// /////////////
describe('auth route', function () {

  describe('GET /', function () {

    it('should return a list of subroutes', function (done) {
      chai.request(app).get('/auth').end(function (err, res) {
        should.exist(res)
        should.not.exist(err)
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('data')
        res.body.data.should.be.a('object')
        res.body.data.should.have.property('attributes')
        res.body.data.attributes.should.be.a('object')
        res.body.data.attributes.should.have.property('subroutes')
        res.body.data.attributes.subroutes.should.be.a('array')
        done()
      })
    })
  })

  describe('GET /verify', function () {

    it('should return documentation', function (done) {
      chai.request(app).get('/auth/verify').end(function (err, res) {
        should.exist(res)
        should.not.exist(err)
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('data')
        res.body.data.should.be.a('object')
        res.body.data.should.have.property('attributes')
        res.body.data.attributes.should.be.a('object')
        res.body.data.attributes.should.have.property('usage')
        res.body.data.attributes.usage.should.be.a('object')
        done()
      })
    })
  })

  describe('POST /verify', function () {

    it('should return an error if no database is specified', function (done) {
      chai.request(app).post('/auth/verify').set('Database', null).end(function (err, res) {

        // basic checks
        should.exist(res)
        should.not.exist(err)
        res.should.have.status(200)

        // structure checks
        res.body.should.be.a('object')
        res.body.should.have.property('errors')
        res.body.errors.should.be.a('array')
        res.body.errors.should.have.length(1)

        // error checks
        res.body.errors[0].should.be.a('object')
        res.body.errors[0].should.have.property('title')
        res.body.errors[0].title.should.be.a('string')
        res.body.errors[0].title.should.equal('response-validate')
        res.body.errors[0].should.have.property('detail')
        res.body.errors[0].detail.should.be.a('string')
        res.body.errors[0].detail.should.equal('invalid database')
        done()
      })
    })

    it('should return an error if non-existent database is specified', function (done) {
      chai.request(app).post('/auth/verify').set('Database', 'üzügümülübrü').end(function (err, res) {

        // basic checks
        should.exist(res)
        should.not.exist(err)
        res.should.have.status(200)

        // structure checks
        res.body.should.be.a('object')
        res.body.should.have.property('errors')
        res.body.errors.should.be.a('array')
        res.body.errors.should.have.length(1)

        // error checks
        res.body.errors[0].should.be.a('object')
        res.body.errors[0].should.have.property('title')
        res.body.errors[0].title.should.be.a('string')
        res.body.errors[0].title.should.equal('response-validate')
        res.body.errors[0].should.have.property('detail')
        res.body.errors[0].detail.should.be.a('string')
        res.body.errors[0].detail.should.equal('invalid database')
        done()
      })
    })

    it('should return an error if no userID is specified', function (done) {
      chai.request(app).post('/auth/verify').set('Database', 'development').send({ userID: null }).end(function (err, res) {

        // basic checks
        should.exist(res)
        should.not.exist(err)
        res.should.have.status(200)

        // structure checks
        res.body.should.be.a('object')
        res.body.should.have.property('errors')
        res.body.errors.should.be.a('array')
        res.body.errors.should.have.length(1)

        // error checks
        res.body.errors[0].should.be.a('object')
        res.body.errors[0].should.have.property('title')
        res.body.errors[0].title.should.be.a('string')
        res.body.errors[0].title.should.equal('response-validate')
        res.body.errors[0].should.have.property('detail')
        res.body.errors[0].detail.should.be.a('string')
        res.body.errors[0].detail.should.equal('id is not defined')
        done()
      })
    })

    it('should return an error if invalid id is specified', function (done) {
      chai.request(app).post('/auth/verify').set('Database', 'development').send({ userID: 'a' }).end(function (err, res) {

        // basic checks
        should.exist(res)
        should.not.exist(err)
        res.should.have.status(200)

        // structure checks
        res.body.should.be.a('object')
        res.body.should.have.property('errors')
        res.body.errors.should.be.a('array')
        res.body.errors.should.have.length(1)

        // error checks
        res.body.errors[0].should.be.a('object')
        res.body.errors[0].should.have.property('title')
        res.body.errors[0].title.should.be.a('string')
        res.body.errors[0].title.should.equal('response-validate')
        res.body.errors[0].should.have.property('detail')
        res.body.errors[0].detail.should.be.a('string')
        res.body.errors[0].detail.should.equal('invalid id')
        done()
      })
    })

    it('should return an error if no token is specified', function (done) {
      chai.request(app).post('/auth/verify').set('Database', 'development').send({ userID: 1, token: null }).end(function (err, res) {

        // basic checks
        should.exist(res)
        should.not.exist(err)
        res.should.have.status(200)

        // structure checks
        res.body.should.be.a('object')
        res.body.should.have.property('errors')
        res.body.errors.should.be.a('array')
        res.body.errors.should.have.length(1)

        // error checks
        res.body.errors[0].should.be.a('object')
        res.body.errors[0].should.have.property('title')
        res.body.errors[0].title.should.be.a('string')
        res.body.errors[0].title.should.equal('response-validate')
        res.body.errors[0].should.have.property('detail')
        res.body.errors[0].detail.should.be.a('string')
        res.body.errors[0].detail.should.equal('token is not defined')
        done()
      })
    })

    it('should return an error if invalid token is specified', function (done) {
      chai.request(app).post('/auth/verify').set('Database', 'development').send({ userID: 1, token: 'abc' }).end(function (err, res) {

        // basic checks
        should.exist(res)
        should.not.exist(err)
        res.should.have.status(200)

        // structure checks
        res.body.should.be.a('object')
        res.body.should.have.property('errors')
        res.body.errors.should.be.a('array')
        res.body.errors.should.have.length(1)

        // error checks
        res.body.errors[0].should.be.a('object')
        res.body.errors[0].should.have.property('title')
        res.body.errors[0].title.should.be.a('string')
        res.body.errors[0].title.should.equal('response-validate')
        res.body.errors[0].should.have.property('detail')
        res.body.errors[0].detail.should.be.a('string')
        res.body.errors[0].detail.should.equal('invalid token')
        done()
      })
    })

    // TODO implement via before()
    it('should return invalid if invalid id-token-pair is specified')

    // TODO implement via before()
    it('should return valid if valid userID-token-pair is specified')
  })

  describe('GET /login', function () {

    it('should return documentation', function (done) {
      chai.request(app).get('/auth/login').end(function (err, res) {
        should.exist(res)
        should.not.exist(err)
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('data')
        res.body.data.should.be.a('object')
        res.body.data.should.have.property('attributes')
        res.body.data.attributes.should.be.a('object')
        res.body.data.attributes.should.have.property('usage')
        res.body.data.attributes.usage.should.be.a('object')
        done()
      })
    })
  })

  describe('POST /login', function () {

    it('should return an error if no database is specified', function (done) {
      chai.request(app).post('/auth/login').set('Database', null).end(function (err, res) {

        // basic checks
        should.exist(res)
        should.not.exist(err)
        res.should.have.status(200)

        // structure checks
        res.body.should.be.a('object')
        res.body.should.have.property('errors')
        res.body.errors.should.be.a('array')
        res.body.errors.should.have.length(1)

        // error checks
        res.body.errors[0].should.be.a('object')
        res.body.errors[0].should.have.property('title')
        res.body.errors[0].title.should.be.a('string')
        res.body.errors[0].title.should.equal('response-validate')
        res.body.errors[0].should.have.property('detail')
        res.body.errors[0].detail.should.be.a('string')
        res.body.errors[0].detail.should.equal('invalid database')
        done()
      })
    })

    it('should return an error if non-existent database is specified', function (done) {
      chai.request(app).post('/auth/login').set('Database', 'üzügümülübrü').end(function (err, res) {

        // basic checks
        should.exist(res)
        should.not.exist(err)
        res.should.have.status(200)

        // structure checks
        res.body.should.be.a('object')
        res.body.should.have.property('errors')
        res.body.errors.should.be.a('array')
        res.body.errors.should.have.length(1)

        // error checks
        res.body.errors[0].should.be.a('object')
        res.body.errors[0].should.have.property('title')
        res.body.errors[0].title.should.be.a('string')
        res.body.errors[0].title.should.equal('response-validate')
        res.body.errors[0].should.have.property('detail')
        res.body.errors[0].detail.should.be.a('string')
        res.body.errors[0].detail.should.equal('invalid database')
        done()
      })
    })

    it('should return an error if no mail is specified', function (done) {
      chai.request(app).post('/auth/login').set('Database', 'development').send({ mail: null }).end(function (err, res) {

        // basic checks
        should.exist(res)
        should.not.exist(err)
        res.should.have.status(200)

        // structure checks
        res.body.should.be.a('object')
        res.body.should.have.property('errors')
        res.body.errors.should.be.a('array')
        res.body.errors.should.have.length(1)

        // error checks
        res.body.errors[0].should.be.a('object')
        res.body.errors[0].should.have.property('title')
        res.body.errors[0].title.should.be.a('string')
        res.body.errors[0].title.should.equal('response-validate')
        res.body.errors[0].should.have.property('detail')
        res.body.errors[0].detail.should.be.a('string')
        res.body.errors[0].detail.should.equal('mail is not defined')
        done()
      })
    })

    it('should return an error if invalid mail is specified', function (done) {
      chai.request(app).post('/auth/login').set('Database', 'development').send({ mail: 'abc@@yahoo.de' }).end(function (err, res) {

        // basic checks
        should.exist(res)
        should.not.exist(err)
        res.should.have.status(200)

        // structure checks
        res.body.should.be.a('object')
        res.body.should.have.property('errors')
        res.body.errors.should.be.a('array')
        res.body.errors.should.have.length(1)

        // error checks
        res.body.errors[0].should.be.a('object')
        res.body.errors[0].should.have.property('title')
        res.body.errors[0].title.should.be.a('string')
        res.body.errors[0].title.should.equal('response-validate')
        res.body.errors[0].should.have.property('detail')
        res.body.errors[0].detail.should.be.a('string')
        res.body.errors[0].detail.should.equal('invalid mail')
        done()
      })
    })

    it('should return an error if no password is specified', function (done) {
      chai.request(app).post('/auth/login').set('Database', 'development').send({ mail: 'yolo@web.de', password: null }).end(function (err, res) {

        // basic checks
        should.exist(res)
        should.not.exist(err)
        res.should.have.status(200)

        // structure checks
        res.body.should.be.a('object')
        res.body.should.have.property('errors')
        res.body.errors.should.be.a('array')
        res.body.errors.should.have.length(1)

        // error checks
        res.body.errors[0].should.be.a('object')
        res.body.errors[0].should.have.property('title')
        res.body.errors[0].title.should.be.a('string')
        res.body.errors[0].title.should.equal('response-validate')
        res.body.errors[0].should.have.property('detail')
        res.body.errors[0].detail.should.be.a('string')
        res.body.errors[0].detail.should.equal('password is not defined')
        done()
      })
    })

    it('should return an error if invalid password is specified', function (done) {
      chai.request(app).post('/auth/login').set('Database', 'development').send({ mail: 'yolo@web.de', password: '' }).end(function (err, res) {

        // basic checks
        should.exist(res)
        should.not.exist(err)
        res.should.have.status(200)

        // structure checks
        res.body.should.be.a('object')
        res.body.should.have.property('errors')
        res.body.errors.should.be.a('array')
        res.body.errors.should.have.length(1)

        // error checks
        res.body.errors[0].should.be.a('object')
        res.body.errors[0].should.have.property('title')
        res.body.errors[0].title.should.be.a('string')
        res.body.errors[0].title.should.equal('response-validate')
        res.body.errors[0].should.have.property('detail')
        res.body.errors[0].detail.should.be.a('string')
        res.body.errors[0].detail.should.equal('password is too short')
        done()
      })
    })

    it('should return an error if invalid mail-password-combination is specified')

    it('should return token if valid mail-password-combination is specified')
  })

  describe('GET /logout', function () {

    it('should return documentation', function (done) {
      chai.request(app).get('/auth/logout').end(function (err, res) {
        should.exist(res)
        should.not.exist(err)
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('data')
        res.body.data.should.be.a('object')
        res.body.data.should.have.property('attributes')
        res.body.data.attributes.should.be.a('object')
        res.body.data.attributes.should.have.property('usage')
        res.body.data.attributes.usage.should.be.a('object')
        done()
      })
    })
  })

  describe('POST /logout', function () {

    it('should return an error if no database is specified', function (done) {
      chai.request(app).post('/auth/logout').set('Database', null).end(function (err, res) {

        // basic checks
        should.exist(res)
        should.not.exist(err)
        res.should.have.status(200)

        // structure checks
        res.body.should.be.a('object')
        res.body.should.have.property('errors')
        res.body.errors.should.be.a('array')
        res.body.errors.should.have.length(1)

        // error checks
        res.body.errors[0].should.be.a('object')
        res.body.errors[0].should.have.property('title')
        res.body.errors[0].title.should.be.a('string')
        res.body.errors[0].title.should.equal('response-validate')
        res.body.errors[0].should.have.property('detail')
        res.body.errors[0].detail.should.be.a('string')
        res.body.errors[0].detail.should.equal('invalid database')
        done()
      })
    })

    it('should return an error if non-existent database is specified', function (done) {
      chai.request(app).post('/auth/logout').set('Database', 'üzügümülübrü').end(function (err, res) {

        // basic checks
        should.exist(res)
        should.not.exist(err)
        res.should.have.status(200)

        // structure checks
        res.body.should.be.a('object')
        res.body.should.have.property('errors')
        res.body.errors.should.be.a('array')
        res.body.errors.should.have.length(1)

        // error checks
        res.body.errors[0].should.be.a('object')
        res.body.errors[0].should.have.property('title')
        res.body.errors[0].title.should.be.a('string')
        res.body.errors[0].title.should.equal('response-validate')
        res.body.errors[0].should.have.property('detail')
        res.body.errors[0].detail.should.be.a('string')
        res.body.errors[0].detail.should.equal('invalid database')
        done()
      })
    })

    it('should return an error if no userID is specified', function (done) {
      chai.request(app).post('/auth/logout').set('Database', 'development').send({ userID: null }).end(function (err, res) {

        // basic checks
        should.exist(res)
        should.not.exist(err)
        res.should.have.status(200)

        // structure checks
        res.body.should.be.a('object')
        res.body.should.have.property('errors')
        res.body.errors.should.be.a('array')
        res.body.errors.should.have.length(1)

        // error checks
        res.body.errors[0].should.be.a('object')
        res.body.errors[0].should.have.property('title')
        res.body.errors[0].title.should.be.a('string')
        res.body.errors[0].title.should.equal('response-validate')
        res.body.errors[0].should.have.property('detail')
        res.body.errors[0].detail.should.be.a('string')
        res.body.errors[0].detail.should.equal('id is not defined')
        done()
      })
    })

    it('should return an error if invalid id is specified', function (done) {
      chai.request(app).post('/auth/logout').set('Database', 'development').send({ userID: 'a' }).end(function (err, res) {

        // basic checks
        should.exist(res)
        should.not.exist(err)
        res.should.have.status(200)

        // structure checks
        res.body.should.be.a('object')
        res.body.should.have.property('errors')
        res.body.errors.should.be.a('array')
        res.body.errors.should.have.length(1)

        // error checks
        res.body.errors[0].should.be.a('object')
        res.body.errors[0].should.have.property('title')
        res.body.errors[0].title.should.be.a('string')
        res.body.errors[0].title.should.equal('response-validate')
        res.body.errors[0].should.have.property('detail')
        res.body.errors[0].detail.should.be.a('string')
        res.body.errors[0].detail.should.equal('invalid id')
        done()
      })
    })

    it('should return an error if no token is specified', function (done) {
      chai.request(app).post('/auth/logout').set('Database', 'development').send({ userID: 1, token: null }).end(function (err, res) {

        // basic checks
        should.exist(res)
        should.not.exist(err)
        res.should.have.status(200)

        // structure checks
        res.body.should.be.a('object')
        res.body.should.have.property('errors')
        res.body.errors.should.be.a('array')
        res.body.errors.should.have.length(1)

        // error checks
        res.body.errors[0].should.be.a('object')
        res.body.errors[0].should.have.property('title')
        res.body.errors[0].title.should.be.a('string')
        res.body.errors[0].title.should.equal('response-validate')
        res.body.errors[0].should.have.property('detail')
        res.body.errors[0].detail.should.be.a('string')
        res.body.errors[0].detail.should.equal('token is not defined')
        done()
      })
    })

    it('should return an error if invalid token is specified', function (done) {
      chai.request(app).post('/auth/logout').set('Database', 'development').send({ userID: 1, token: 'abc' }).end(function (err, res) {

        // basic checks
        should.exist(res)
        should.not.exist(err)
        res.should.have.status(200)

        // structure checks
        res.body.should.be.a('object')
        res.body.should.have.property('errors')
        res.body.errors.should.be.a('array')
        res.body.errors.should.have.length(1)

        // error checks
        res.body.errors[0].should.be.a('object')
        res.body.errors[0].should.have.property('title')
        res.body.errors[0].title.should.be.a('string')
        res.body.errors[0].title.should.equal('response-validate')
        res.body.errors[0].should.have.property('detail')
        res.body.errors[0].detail.should.be.a('string')
        res.body.errors[0].detail.should.equal('invalid token')
        done()
      })
    })

    it('should return no error if invalid id-token-pair is specified')

    it('should return no erorr if valid userID-token-pair is specified')
  })
})

// //////////////////
// DATABASES ROUTE //
// //////////////////
describe('databases route', function () {

  describe('GET /', function () {

    it('should return a list of subroutes', function (done) {
      chai.request(app).get('/databases').end(function (err, res) {
        should.exist(res)
        should.not.exist(err)
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('data')
        res.body.data.should.be.a('object')
        res.body.data.should.have.property('attributes')
        res.body.data.attributes.should.be.a('object')
        res.body.data.attributes.should.have.property('subroutes')
        res.body.data.attributes.subroutes.should.be.a('array')
        done()
      })
    })
  })

  describe('GET /stats', function () {

    it('should return an error if no database is specified', function (done) {
      chai.request(app).get('/databases/stats').set('Database', null).end(function (err, res) {

        // basic checks
        should.exist(res)
        should.not.exist(err)
        res.should.have.status(200)

        // structure checks
        res.body.should.be.a('object')
        res.body.should.have.property('errors')
        res.body.errors.should.be.a('array')
        res.body.errors.should.have.length(1)

        // error checks
        res.body.errors[0].should.be.a('object')
        res.body.errors[0].should.have.property('title')
        res.body.errors[0].title.should.be.a('string')
        res.body.errors[0].title.should.equal('response-validate')
        res.body.errors[0].should.have.property('detail')
        res.body.errors[0].detail.should.be.a('string')
        res.body.errors[0].detail.should.equal('invalid database')
        done()
      })
    })

    it('should return an error if non-existent database is specified', function (done) {
      chai.request(app).get('/databases/stats').set('Database', 'üzügümülübrü').end(function (err, res) {

        // basic checks
        should.exist(res)
        should.not.exist(err)
        res.should.have.status(200)

        // structure checks
        res.body.should.be.a('object')
        res.body.should.have.property('errors')
        res.body.errors.should.be.a('array')
        res.body.errors.should.have.length(1)

        // error checks
        res.body.errors[0].should.be.a('object')
        res.body.errors[0].should.have.property('title')
        res.body.errors[0].title.should.be.a('string')
        res.body.errors[0].title.should.equal('response-validate')
        res.body.errors[0].should.have.property('detail')
        res.body.errors[0].detail.should.be.a('string')
        res.body.errors[0].detail.should.equal('invalid database')
        done()
      })
    })

    it('should return stats about the specified database', function (done) {
      chai.request(app).get('/databases/stats').set('Database', 'KFA_phpentwicklung').end(function (err, res) {

        // basic checks
        should.exist(res)
        should.not.exist(err)
        res.should.have.status(200)

        // structure checks
        res.body.should.be.a('object')
        res.body.should.have.property('data')
        res.body.data.should.be.a('object')
        res.body.data.should.have.property('attributes')
        res.body.data.attributes.should.be.a('object')

        // content checks -- size
        res.body.data.attributes.should.have.property('size')
        res.body.data.attributes.size.should.be.a('number')

        // content checks -- sampleCount
        res.body.data.attributes.should.have.property('sampleCount')
        res.body.data.attributes.sampleCount.should.be.a('number')

        // content checks -- particleCount
        res.body.data.attributes.should.have.property('particleCount')
        res.body.data.attributes.particleCount.should.be.a('number')

        done()
      })
    })
  })

  describe('GET /available', function () {

    it('should return an array of available databases', function (done) {
      chai.request(app).get('/databases/available').end(function (err, res) {

        // basic checks
        should.exist(res)
        should.not.exist(err)
        res.should.have.status(200)

        // structure checks
        res.body.should.be.a('object')
        res.body.should.have.property('data')
        res.body.data.should.be.a('object')
        res.body.data.should.have.property('attributes')
        res.body.data.attributes.should.be.a('object')

        // databases checks
        res.body.data.attributes.should.have.property('available')
        res.body.data.attributes.available.should.be.a('array')

        done()
      })
    })
  })
})

// /////////////
// USER ROUTE //
// /////////////
describe('user route', function () {

  describe('GET /', function () {

    it('should return a list of subroutes', function (done) {
      chai.request(app).get('/user').end(function (err, res) {
        should.exist(res)
        should.not.exist(err)
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('data')
        res.body.data.should.be.a('object')
        res.body.data.should.have.property('attributes')
        res.body.data.attributes.should.be.a('object')
        res.body.data.attributes.should.have.property('subroutes')
        res.body.data.attributes.subroutes.should.be.a('array')
        done()
      })
    })
  })

  describe('GET /register', function () {

  })

  describe('POST /register', function () {

  })

  describe('GET /confirm', function () {

  })

  describe('POST /confirm', function () {

  })

  describe('GET /upgrade', function () {

  })

  describe('POST /upgrade', function () {

  })

  describe('GET /:id', function () {

  })
})
