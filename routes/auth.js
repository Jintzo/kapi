// load required modules
var express = require('express')
var callbackFactory = require('./../factories/callback')

// set up router
var router = express.Router()

// load auth model
var auth = require('./../models/auth')

/**
 * GET /
 * show available endpoints
 */
router.get('/', function (req, res) {
  res.json(callbackFactory.documentation({ subroutes: ['login', 'logout', 'verify'] }))
})

/**
 * GET verify
 * returns documentation on how to use the verify route
 */
router.get('/verify', function (req, res) {
  res.json(callbackFactory.documentation({ usage: {
    userID: '[userID]',
    token: '[token]'
  }}))
})

/**
 * POST verify
 * verifies a userID-token-combination
 *
 * Header: database
 * Body: userID, token
 */
router.post('/verify', function (req, res) {

  auth.verify(req.body.userID, req.body.token, req.get('Database'), function (result) {
    res.json(result)
  })
})

/**
 * GET /login
 * returns documentation on how to use the login route
 */
router.get('/login', function (req, res) {
  res.json(callbackFactory.documentation({ usage: {
    user: '[name]',
    password: '[password]'
  }}))
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

/**
 * GET /logout
 * returns documentation on how to use the logout route
 */
router.get('/logout', function (req, res) {
  res.json(callbackFactory.documentation({ usage: {
    userID: '[userID]',
    token: '[token]'
  }}))
})

/**
 * POST /logout
 * invalidates a token
 *
 * Header: database
 * Body: userID, token
 */
router.post('/logout', function (req, res) {
  auth.delete(req.body.userID, req.body.token, req.get('Database'), function (result) {
    res.json(result)
  })
})

module.exports = router
