// load required modules
let express = require('express')
var callbackFactory = require('./../factories/callback')

// set up router
var router = express.Router()

/**
 * GET /
 * show available endpoints
*/
router.get('/', function (req, res, next) {
  res.json(callbackFactory.documentation({ subroutes: ['none'] }))
})

module.exports = router
