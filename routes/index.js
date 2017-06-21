// load required modules
let express = require('express')

// set up router
var router = express.Router()

/**
 * GET /
 * show available endpoints
*/
router.get('/', function (req, res, next) {
  res.json({ subroutes: ['auth', 'databases'] })
})

module.exports = router
