// load required modules
let express = require('express')
let path = require('path')
let logger = require('morgan')
let constants = require('./conf/constants')
let callbackFactory = require('./factories/callback')
var cors = require('cors')

// allow all origins
app.use(cors({origin: 'null'}))

// initialize app
var app = express()

// logging
if (process.env.NODE_ENV !== 'test') {
  app.use(logger('dev'))
}
app.use(express.static(path.join(__dirname, 'public')))

// POST parsing
var bodyParser = require('body-parser')
app.use(bodyParser.json()) // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })) // support urlencoded bodies

// use external routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/databases', require('./routes/databases'))
app.use('/user', require('./routes/user'))

// 404 forwarding
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handling
app.use(function (err, req, res, next) {
  // return error
  res.status(err.status || 500)
  res.json(callbackFactory.error(err, constants.responses.general))
})

module.exports = app
