// load required modules
import express from 'express'
import path from 'path'
import logger from 'morgan'

// initialize app
var app = express()

// logging
app.use(logger('dev'))
app.use(express.static(path.join(__dirname, 'public')))

// POST parsing
var bodyParser = require('body-parser')
app.use(bodyParser.json()) // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })) // support urlencoded bodies

// use external routes
app.use('/', require('./routes/index'))

// 404 forwarding
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handling
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.json({
    data: [{
      type: 'response-general',
      id: 1,
      attributes: {
        error: err
      }
    }]
  })
})

module.exports = app
