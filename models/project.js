// load needed modules
var errorFactory = require('./../factories/error')
var database = require('./../database')
var auth = require('./auth')

// load needed validators
var authValidator = require('./../validators/auth')
var databaseValidator = require('./../validators/database')

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

          // pool connection
          database.pool(databaseName).getConnection(function (error, connection) {

            // call back error if any
            if (error) {
              callback({ error })
              return
            }

            // get all available samples in all available projects
            connection.query('SELECT sample.id AS sampleID, sample.name AS sampleName, sample.description AS sampleDescription, project.id AS projectID, project.name AS projectName FROM project INNER JOIN sample ON project.id = sample.projectID', function (error, rows) {

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
                  if (projectData !== {}) {
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
              }

              // add tangling project
              if (projectData !== {}) {
                resultData.push(projectData)
              }
              callback(resultData)
            })
          })
        })
      })
    })
  }
}
