// load required modules
var express = require('express')

// set up router
var router = express.Router()

// load user model
var user = require('./../models/user')

/**
 * GET /
 * show available endpoints
 */
router.get('/', function (req, res) {
  res.json({ subroutes: ['register', ':id'] })
})

/**
 * GET /register
 * returns documentation on how to use the register route
 */
router.get('/register', function (req, res) {
  res.json({ usage: {
    name: '[username]',
    mail: '[mail]',
    password: '[password]',
    passwordConfirm: '[passwordConfirm]',
    database: '[database]'
  }})
})

/**
 * POST /register
 * register a new user (which needs to be confirmed by a confirmed administrator)
 *
 * Header: Database
 * Body: mail, password, passwordConfirm, type
 */
router.post('/register', function (req, res) {
  user.register(req.body.name, req.body.mail, req.body.password, req.body.passwordConfirm, req.get('database'), function (result) {
    res.json(result)
  })
})

/**
 * GET /:id
 * returns data on the specified user
 */
router.get('/:id', function (req, res) {
  user.data(req.params.id, req.get('token'), req.get('database'), function (result) {
    res.json(result)
  })
})

module.exports = router
