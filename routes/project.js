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

/**
 * GET /empty
 *
 * get all empty projects from the specified database
 */
router.get('/empty', function (req, res) {
  project.getEmpty(req.get('database'), req.get('token'), function (result) {
    res.json(result)
  })
})

/**
 * GET /:id
 *
 * get data for a specific project
 */
router.get('/:id', function (req, res) {
  project.getProject(req.params.id, req.get('database'), req.get('token'), function (result) {
    res.json(result)
  })
})

module.exports = router
