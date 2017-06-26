// load needed modules
var errorFactory = require('./../factories/error')
var database = require('./../database')
var auth = require('./auth')
var constants = require('./../conf/constants')
var async = require('async')

// load needed validators
var authValidator = require('./../validators/auth')
var databaseValidator = require('./../validators/database')
var projectValidator = require('./../validators/project')

module.exports = {

  /**
   * get an overview over the available projects and their samples
   * @param  {String}   databaseName database to be operated on
   * @param  {String}   token        user's token
   * @param  {Function} callback     callback function
   * @return {void}
   */
  getOverview: function (databaseName, token, callback) {

    // validate database
    databaseValidator.name(databaseName, function (result) {

      if (errorFactory.containsError(result)) {
        callback(result)
        return
      }

      // validate token
      authValidator.token(token, function (result) {

        if (errorFactory.containsError(result)) {
          callback(result)
          return
        }

        // check that session is valid
        auth.verify(token, databaseName, function (result) {

          if (errorFactory.containsError(result)) {
            callback(result)
            return
          }

          // get connection
          let connection = database.getConnection(databaseName)

          // get all available samples in all available projects
          connection.query('SELECT sample.id AS sampleID, sample.name AS sampleName, sample.description AS sampleDescription, project.id AS projectID, project.name AS projectName FROM project INNER JOIN sample ON project.id = sample.projectID', function (error, rows) {
            console.log('killing connection')
            connection.end()

            // call back err if any
            if (error) {
              callback({ error })
              return
            }

            // go over rows
            let resultData = []
            let oldID = 0
            let projectData = {}
            for (var i = 0; i < rows.length; i++) {

              // check if this is the next project
              if (oldID !== rows[i].projectID) {

                // push old project data and start next project
                if (projectData.name) {
                  resultData.push(projectData)
                }

                let sampleID = rows[i].sampleID
                let sampleName = rows[i].sampleName
                let sampleDescription = rows[i].sampleDescription
                let projectID = rows[i].projectID
                let projectName = rows[i].projectName

                projectData = {
                  id: projectID,
                  name: projectName,
                  samples: [{
                    id: sampleID,
                    name: sampleName,
                    description: sampleDescription
                  }]
                }
              } else {

                // add data to existing project
                let sampleID = rows[i].sampleID
                let sampleName = rows[i].sampleName
                let sampleDescription = rows[i].sampleDescription
                projectData.samples.push({
                  id: sampleID,
                  name: sampleName,
                  description: sampleDescription
                })
              }
              oldID = rows[i].projectID
            }

            // add tangling project
            if (projectData.name) {
              resultData.push(projectData)
            }
            callback(resultData)
          })
        })
      })
    })
  },

  /**
   * get all empty projects.
   * @param  {String}   databaseName name of the database
   * @param  {String}   token        user's token
   * @param  {Function} callback     callback function
   * @return {void}
   */
  getEmpty: function (databaseName, token, callback) {

    // validate database
    databaseValidator.name(databaseName, function (result) {

      if (errorFactory.containsError(result)) {
        callback(result)
        return
      }

      // validate token
      authValidator.token(token, function (result) {

        if (errorFactory.containsError(result)) {
          callback(result)
          return
        }

        // check that session is valid
        auth.verify(token, databaseName, function (result) {

          if (errorFactory.containsError(result)) {
            callback(result)
            return
          }

          // get connection
          let connection = database.getConnection(databaseName)

          // get all projects that do not have any samples
          connection.query('SELECT * FROM project WHERE id NOT IN (SELECT DISTINCT projectID FROM sample)', function (error, rows) {
            console.log('killing connection')
            connection.end()

            // call back err if any
            if (error) {
              callback({ error })
              return
            }

            // call back data
            callback(rows)
          })
        })
      })
    })
  },

  /**
   * get base data for a project
   * @param  {Integer}   id           id of the project
   * @param  {String}   databaseName name of the database
   * @param  {String}   token        user's token
   * @param  {Function} callback     callback function
   * @return {void}
   */
  getProject: function (id, databaseName, token, callback) {

    // validate database
    databaseValidator.name(databaseName, function (result) {

      if (errorFactory.containsError(result)) {
        callback(result)
        return
      }

      // validate token
      authValidator.token(token, function (result) {

        if (errorFactory.containsError(result)) {
          callback(result)
          return
        }

        // validate id
        projectValidator.id(id, function (result) {

          if (errorFactory.containsError(result)) {
            callback(result)
            return
          }

          // check that session is valid
          auth.verify(token, databaseName, function (result) {

            if (errorFactory.containsError(result)) {
              callback(result)
              return
            }

            // get connection
            let connection = database.getConnection(databaseName)

            // get base project data
            var project = {}
            connection.query('SELECT * FROM project WHERE id = ?', [id], function (error, projectRows) {

              // call back err if any
              if (error) {
                connection.end()
                callback({ error })
                return
              }

              // check if that project exists
              if (projectRows.length === 0) {
                const error = errorFactory.generate(constants.errors.no_such, { thing: 'project' })
                connection.end()
                callback({ error })
                return
              }

              // set project name and id
              project.id = id
              project.name = projectRows[0].name
              project.samples = []

              // get samples
              connection.query('SELECT id, name, description FROM sample WHERE projectID = ?', [id], function (error, sampleRows) {

                // call back err if any
                if (error) {
                  connection.end()
                  callback({ error })
                  return
                }

                async.forEachOf(sampleRows, function (sampleRow, i, innerCallback) {

                  // generate sample object
                  var sample = {}

                  sample.id = sampleRow.id
                  sample.name = sampleRow.name
                  sample.description = sampleRow.description
                  sample.fractions = []

                  // get fractions
                  connection.query('SELECT id, sieve, throughput FROM fraction WHERE sampleID = ?', [sample.id], function (error, fractionRows) {

                    // call back err if any
                    if (error) {
                      connection.end()
                      callback({ error })
                      return
                    }

                    async.forEachOf(fractionRows, function (fractionRow, j, innerInnerCallback) {

                      // generate fraction object
                      var fraction = {}

                      fraction.id = fractionRows[j].id
                      fraction.sieve = fractionRows[j].sieve
                      fraction.throughput = fractionRows[j].throughput

                      // get main image
                      connection.query('SELECT urlBinJPG AS url FROM image WHERE number = 1 AND fractionID = ?', [fraction.id], function (error, imageRows) {
                        connection.end()

                        // call back err if any
                        if (error) {
                          callback({ error })
                          return
                        }

                        // check that image exists
                        if (imageRows.length <= 0) {
                          const error = errorFactory.generate(constants.errors.no_such, { thing: 'image' })
                          callback({ error })
                          return
                        }

                        // add image
                        fraction.imageURL = constants.general.imageBasePath + sample.name + '/' + imageRows[0].url
                        fraction.imageURLThumbnail = constants.general.imageBasePath + sample.name + '/thumb/' + imageRows[0].url.replace('.jpg', '_thumb.jpg')

                        // push back fraction
                        sample.fractions.push(fraction)
                        innerInnerCallback()
                      })
                    }, function (error) {
                      if (error) {
                        callback({ error })
                      } else {
                        // push back sample
                        project.samples.push(sample)
                        innerCallback()
                      }
                    })
                  })
                }, function (error) {
                  if (error) {
                    callback({ error })
                  } else {
                    callback(project)
                  }
                })
              })
            })
          })
        })
      })
    })
  }
}
