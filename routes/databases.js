// load required modules
var express = require('express')
var callbackFactory = require('./../factories/callback')

// set up router
var router = express.Router()

// load database model
var databases = require('./../models/databases')

/**
 * GET /
 * show available endpoints
 */
router.get('/', function (req, res) {
  res.json(callbackFactory.documentation({ subroutes: ['stats', 'available'] }))
})

/**
 * GET /stats
 * returns stats on the provided database
 */
router.get('/stats', function (req, res) {
  databases.stats(req.get('Database'), function (result) {
    res.json(result)
  })
})

/**
 * GET /available
 * return available databases
 */
router.get('/available', function (req, res) {
  databases.available(function (result) {
    res.json(result)
  })
})

module.exports = router