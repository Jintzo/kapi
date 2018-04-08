// load required modules
const express = require('express')

// set up router
const router = express.Router()

// load auth model
const Auth = require('./../models/auth')

/**
 * GET /
 * show available endpoints
 */
router.get('/', function (req, res) {
  res.json({ subroutes: ['login', 'logout', 'verify'] })
})

/**
 * GET verify
 * verifies a token
 */
router.get('/verify', function (req, res) {
  auth.verify(req.get('token'), req.get('database'), function (result) {
    res.json(result)
  })
})

/**
 * GET /login
 * returns documentation on how to use the login route
 */
router.get('/login', function (req, res) {
  res.json({ usage: {
    user: '[name]',
    password: '[password]'
  }})
})

/**
 * POST /login
 * creates a new 30-day token for the user
 *
 * Header: database
 * Body: user, password
 */
router.post('/login', function (req, res) {

  auth.create(req.body.user, req.body.password, req.get('database'), function (result) {
    res.json(result)
  })
})

module.exports = router
