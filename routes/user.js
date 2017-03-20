// load required modules
var express = require('express')
var callbackFactory = require('./../factories/callback')

// set up router
var router = express.Router()

// load user model
var user = require('./../models/user')

/**
 * GET /
 * show available endpoints
 */
router.get('/', function (req, res) {
  res.json(callbackFactory.documentation({ subroutes: ['register', 'confirm', 'upgrade', ':id'] }))
})

/**
 * GET /register
 * returns documentation on how to use the register route
 */
router.get('/register', function (req, res) {
  res.json(callbackFactory.documentation({ usage: {
    mail: '[mail]',
    password: '[password]',
    passwordConfirm: '[passwordConfirm]',
    type: '[type]'
  }}))
})

/**
 * POST /register
 * register a new user (which needs to be confirmed by a confirmed administrator)
 *
 * Header: Database
 * Body: mail, password, passwordConfirm, type
 */
router.post('/register', function (req, res) {
  user.register(req.body.mail, req.body.password, req.body.passwordConfirm, req.body.type, req.get('Database'), function (result) {
    res.json(result)
  })
})

/**
 * GET /confirm
 * returns documentation on how to use the confirm route
 */
router.get('/confirm', function (req, res) {
  res.json(callbackFactory.documentation({ usage: {
    userID: '[ID of the user to be confirmed]'
  }}))
})

/**
 * POST /confirm
 * confirm a user
 *
 * Header: Database, token
 * Body: userID
 */
router.post('/confirm', function (req, res) {
  user.confirm(req.body.userID, req.get('Token'), req.get('Database'), function (result) {
    res.json(result)
  })
})

/**
 * GET /upgrade
 * returns documentation on how to use the upgrade route
 */
router.get('/upgrade', function (req, res) {
  res.json(callbackFactory.documentation({ usage: {
    userID: '[ID of the user to be upgraded]',
    type: '[new type of the user]'
  }}))
})

/**
 * POST /upgrade
 * change the type of a user
 */
router.post('/upgrade', function (req, res) {
  user.upgrade(req.body.userID, req.body.type, req.get('Token'), req.get('Database'), function (result) {
    res.json(result)
  })
})

/**
 * GET /:id
 * returns data on the specified user
 */
router.get('/:id', function (req, res) {
  user.data(req.params.id, req.get('Token'), req.get('Database'), function (result) {
    res.json(result)
  })
})
