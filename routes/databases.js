// load required modules
var express = require('express')
var callbackFactory = require('./../factories/callback')

// set up router
var router = express.Router()

// load database model
var database = require('./../models/database')

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
  database.stats(req.get('Database'), function (result) {
    res.json(result)
  })
})

/**
 * GET /available
 * return available databases
 */
router.get('/available', function (req, res) {
  database.available(function (result) {
    res.json(result)
  })
})
