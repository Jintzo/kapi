// load required modules
const express = require('express')
const path = require('path')
const logger = require('morgan')
const bodyParser = require('body-parser')

// initialize app
var app = express()

// logging
if (process.env.NODE_ENV !== 'test') {
  app.use(logger('dev'))
}
app.use(express.static(path.join(__dirname, 'public')))

// add headers
app.use(function (req, res, next) {

  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,database,token')
  res.setHeader('Access-Control-Allow-Credentials', true)
  next()
})

// POST parsing
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
