// load chai
const should = require('chai').should()

// load modules to be tested
const callbackFactory = require('./../factories/callback')
const errorFactory = require('./../factories/error')

// describe callback factory
describe('Callback Factory', function () {

  // error callback function
  describe('#errorCallback(errorText, responseType)', function () {

    it('should return default error if both errorText and responseType are undefined', function (done) {

      // get return object
      const returnObject = callbackFactory.error(null, null)

      // basic checks
      should.exist(returnObject)
      returnObject.should.be.a('object')

      // structure checks
      returnObject.should.have.property('errors')
      returnObject.errors.should.be.a('array')
      returnObject.errors.should.have.length(1)
      returnObject.errors[0].should.be.a('object')

      // title checks
      returnObject.errors[0].should.have.property('title')
      returnObject.errors[0].title.should.be.a('string')
      returnObject.errors[0].title.should.equal('response-general')

      // detail checks
      returnObject.errors[0].should.have.property('detail')
      returnObject.errors[0].detail.should.be.a('string')
      returnObject.errors[0].detail.should.equal('unknown error')
      done()
    })

    it('should return default error if both errorText and responseType are empty', function (done) {

      // get return object
      const returnObject = callbackFactory.error('', '')

      // basic checks
      should.exist(returnObject)
      returnObject.should.be.a('object')

      // structure checks
      returnObject.should.have.property('errors')
      returnObject.errors.should.be.a('array')
      returnObject.errors.should.have.length(1)
      returnObject.errors[0].should.be.a('object')

      // title checks
      returnObject.errors[0].should.have.property('title')
      returnObject.errors[0].title.should.be.a('string')
      returnObject.errors[0].title.should.equal('response-general')

      // detail checks
      returnObject.errors[0].should.have.property('detail')
      returnObject.errors[0].detail.should.be.a('string')
      returnObject.errors[0].detail.should.equal('unknown error')
      done()
    })

    it('should return adapted default error if only errorText is set', function (done) {

      // get return object
      const returnObject = callbackFactory.error('errorText', '')

      // basic checks
      should.exist(returnObject)
      returnObject.should.be.a('object')

      // structure checks
      returnObject.should.have.property('errors')
      returnObject.errors.should.be.a('array')
      returnObject.errors.should.have.length(1)
      returnObject.errors[0].should.be.a('object')

      // title checks
      returnObject.errors[0].should.have.property('title')
      returnObject.errors[0].title.should.be.a('string')
      returnObject.errors[0].title.should.equal('response-general')

      // detail checks
      returnObject.errors[0].should.have.property('detail')
      returnObject.errors[0].detail.should.be.a('string')
      returnObject.errors[0].detail.should.equal('errorText')
      done()
    })

    it('should return adapted default error if only responseType is set', function (done) {

      // get return object
      const returnObject = callbackFactory.error('', 'response-test')

      // basic checks
      should.exist(returnObject)
      returnObject.should.be.a('object')

      // structure checks
      returnObject.should.have.property('errors')
      returnObject.errors.should.be.a('array')
      returnObject.errors.should.have.length(1)
      returnObject.errors[0].should.be.a('object')

      // title checks
      returnObject.errors[0].should.have.property('title')
      returnObject.errors[0].title.should.be.a('string')
      returnObject.errors[0].title.should.equal('response-test')

      // detail checks
      returnObject.errors[0].should.have.property('detail')
      returnObject.errors[0].detail.should.be.a('string')
      returnObject.errors[0].detail.should.equal('unknown error')
      done()
    })

    it('should return custom error if all is correctly set', function (done) {

      // get return object
      const returnObject = callbackFactory.error('errorText', 'response-test')

      // basic checks
      should.exist(returnObject)
      returnObject.should.be.a('object')

      // structure checks
      returnObject.should.have.property('errors')
      returnObject.errors.should.be.a('array')
      returnObject.errors.should.have.length(1)
      returnObject.errors[0].should.be.a('object')

      // title checks
      returnObject.errors[0].should.have.property('title')
      returnObject.errors[0].title.should.be.a('string')
      returnObject.errors[0].title.should.equal('response-test')

      // detail checks
      returnObject.errors[0].should.have.property('detail')
      returnObject.errors[0].detail.should.be.a('string')
      returnObject.errors[0].detail.should.equal('errorText')
      done()
    })
  })

  describe('#documentationCallback(documentationObject)', function () {

    it('should return empty documentation if no documentationObject is defined', function (done) {

      // get return object
      const returnObject = callbackFactory.documentation(null)

      // basic checks
      should.exist(returnObject)
      returnObject.should.be.a('object')

      // structure checks
      returnObject.should.have.property('data')
      returnObject.data.should.be.a('object')

      // attribute checks
      returnObject.data.should.have.property('attributes')
      should.equal(returnObject.data.attributes, null)
      done()
    })

    it('should return empty documentation if documentation is not an object', function (done) {

      // get return object
      const returnObject = callbackFactory.documentation('test')

      // basic checks
      should.exist(returnObject)
      returnObject.should.be.a('object')

      // structure checks
      returnObject.should.have.property('data')
      returnObject.data.should.be.a('object')

      // attribute checks
      returnObject.data.should.have.property('attributes')
      should.equal(returnObject.data.attributes, null)
      done()
    })

    it('should return adapted documentation if documentationObject is correctly defined', function (done) {

      // get return object
      const returnObject = callbackFactory.documentation({foo: 'bar'})

      // basic checks
      should.exist(returnObject)
      returnObject.should.be.a('object')

      // structure checks
      returnObject.should.have.property('data')
      returnObject.data.should.be.a('object')

      // attribute checks
      returnObject.data.should.have.property('attributes')
      returnObject.data.attributes.should.be.a('object')

      // detail checks
      returnObject.data.attributes.should.have.property('foo')
      returnObject.data.attributes.foo.should.be.a('string')
      returnObject.data.attributes.foo.should.equal('bar')
      done()
    })
  })

  describe('#single(dataObject, responseType)', function () {

    it('should return null attributes if no attributes are specified', function (done) {

      // get return object
      const returnObject = callbackFactory.single(null, null)

      // basic checks
      should.exist(returnObject)
      returnObject.should.be.a('object')

      // structure checks
      returnObject.should.have.property('data')
      returnObject.data.should.be.a('object')

      // attribute checks
      returnObject.data.should.have.property('attributes')
      should.equal(returnObject.data.attributes, null)

      done()
    })

    it('should return null attributes if specified attributes is not an object', function (done) {

      // get return object
      const returnObject = callbackFactory.single('abc', null)

      // basic checks
      should.exist(returnObject)
      returnObject.should.be.a('object')

      // structure checks
      returnObject.should.have.property('data')
      returnObject.data.should.be.a('object')

      // attribute checks
      returnObject.data.should.have.property('attributes')
      should.equal(returnObject.data.attributes, null)

      done()
    })

    it('should return correct attributes if valid attributes are specified', function (done) {

      // get return object
      const returnObject = callbackFactory.single({ foo: 'bar' }, null)

      // basic checks
      should.exist(returnObject)
      returnObject.should.be.a('object')

      // structure checks
      returnObject.should.have.property('data')
      returnObject.data.should.be.a('object')

      // attribute checks
      returnObject.data.should.have.property('attributes')
      returnObject.data.attributes.should.be.a('object')
      returnObject.data.attributes.should.have.property('foo')
      returnObject.data.attributes.foo.should.be.a('string')
      returnObject.data.attributes.foo.should.equal('bar')

      done()
    })

    it('should return general response if no responseType is specified', function (done) {

      // get return object
      const returnObject = callbackFactory.single(null, null)

      // basic checks
      should.exist(returnObject)
      returnObject.should.be.a('object')

      // structure checks
      returnObject.should.have.property('data')
      returnObject.data.should.be.a('object')

      // type checks
      returnObject.data.should.have.property('type')
      returnObject.data.type.should.be.a('string')
      returnObject.data.type.should.equal('response-general')

      done()
    })

    it('should return general response if specified responseType is not a string', function (done) {

      // get return object
      const returnObject = callbackFactory.single(null, { foo: 'bar' })

      // basic checks
      should.exist(returnObject)
      returnObject.should.be.a('object')

      // structure checks
      returnObject.should.have.property('data')
      returnObject.data.should.be.a('object')

      // type checks
      returnObject.data.should.have.property('type')
      returnObject.data.type.should.be.a('string')
      returnObject.data.type.should.equal('response-general')

      done()
    })

    it('should return correct response type if valid responseType is specified', function (done) {

      // get return object
      const returnObject = callbackFactory.single(null, 'response-test')

      // basic checks
      should.exist(returnObject)
      returnObject.should.be.a('object')

      // structure checks
      returnObject.should.have.property('data')
      returnObject.data.should.be.a('object')

      // type checks
      returnObject.data.should.have.property('type')
      returnObject.data.type.should.be.a('string')
      returnObject.data.type.should.equal('response-test')

      done()
    })
  })
})

// describe error factory
describe('Error Factory', function () {

  // error generate function
  describe('#generate(error, parameters)', function () {

    it('should return an unknown error text if no error and no parameters are provided', function (done) {
      const errorText = errorFactory.generate(null, null)

      should.exist(errorText)
      errorText.should.be.a('string')
      errorText.should.equal('unknown error')
      done()
    })

    it('should return an unknown error text if only parameters are provided', function (done) {
      const errorText = errorFactory.generate(null, {foo: 'bar'})

      should.exist(errorText)
      errorText.should.be.a('string')
      errorText.should.equal('unknown error')
      done()
    })

    it('should return correct error with undefined parameters if no parameters are set', function (done) {
      const errorText = errorFactory.generate({text: '~thing is not defined', parameters: ['thing']}, null)

      should.exist(errorText)
      errorText.should.be.a('string')
      errorText.should.equal('[undefined] is not defined')
      done()
    })

    it('should return correct error if both error and necessary parameters are provided', function (done) {
      const errorText = errorFactory.generate({text: '~thing is not defined', parameters: ['thing']}, {thing: 'bla'})

      should.exist(errorText)
      errorText.should.be.a('string')
      errorText.should.equal('bla is not defined')
      done()
    })

    it('should return an unknown error text if the error object is malformatted', function (done) {
      const errorText = errorFactory.generate({foo: 'bar'}, {thing: 'bla'})

      should.exist(errorText)
      errorText.should.be.a('string')
      errorText.should.equal('unknown error')
      done()
    })
  })

  describe('#containsError(errorObject)', function () {

    it('should return false if non-object is provided', function (done) {
      const result = errorFactory.containsError('abc')
      result.should.equal(false)

      done()
    })

    it('should return false if random object is provided', function (done) {
      const result = errorFactory.containsError({ data: { usage: { test: '[test]' } } })
      result.should.equal(false)

      done()
    })

    it('should return false if none-error is provided', function (done) {
      const result = errorFactory.containsError({ errors: [{ title: 'response-validate', detail: 'none' }] })
      result.should.equal(false)

      done()
    })

    it('should return true if valid error object (!= none) is provided', function (done) {
      const result = errorFactory.containsError({ errors: [{ title: 'response-validate', detail: 'test' }] })
      result.should.equal(true)

      done()
    })
  })
})
