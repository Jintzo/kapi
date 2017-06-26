// load required modules
let express = require('express')
let path = require('path')
let logger = require('morgan')

// initialize app
var app = express()

// logging
if (process.env.NODE_ENV !== 'test') {
  app.use(logger('dev'))
}
app.use(express.static(path.join(__dirname, 'public')))

// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:9000')

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,database,token')

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true)

  // Pass to next layer of middleware
  next()
})

// POST parsing
var bodyParser = require('body-parser')
app.use(bodyParser.json()) // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })) // support urlencoded bodies

// use external routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/databases', require('./routes/databases'))
app.use('/user', require('./routes/user'))
app.use('/project', require('./routes/project'))

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
  res.json({ error: err })
})

module.exports = app
