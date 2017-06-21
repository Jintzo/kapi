// load required modules
var express = require('express')

// set up router
var router = express.Router()

// load project model
var project = require('./../models/project')

/**
 * GET /
 *
 * get an overview over the available projects and their samples
 */
router.get('/', function (req, res) {
  project.getOverview(req.get('database'), req.get('token'), function (result) {
    res.json(result)
  })
})
