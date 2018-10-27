'use strict'

/** @module controllers/CategoryController */

const { validate } = require('../services/validationService')
/** The conection to db method. */
const { connectToDatabase } = require('../db/db')

// const { validateCategory, validateSearchUpdate } = require('../services/validationService')

/** search product model. */
const Category = require('../models/Category')

/**
 * Create a new Category.
 * @param {object} event - The http event.
 * @param {object} context - The context.
 * @param {callback} callback - callback method to return the response.
 * @return {json} The response.
 */
module.exports.create = (event, context, callback) => {
  connectToDatabase()
    .then(() => {
      Category.create(JSON.parse(event.body), function (err, product) {
        if (err) { return validate(err, callback) }
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(product)
        })
      })
    })
    .catch(reason => {
      console.log('Manejar promesa rechazada (' + reason + ') aquí searchproductController.')
    })
}

/**
 * return one searchproduct by given id.
 * @param {object} event - The http event.
 * @param {object} context - The context.
 * @param {callback} callback - callback method to return the response.
 * @return {json} The response.
 */
module.exports.getOne = (event, context, callback) => {
  connectToDatabase()
    .then(() => {
      Category.findById(event.pathParameters.id)
        .then(product => callback(null, {
          statusCode: 200,
          body: JSON.stringify(product)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not fetch the note.'
        }))
    })
}

/**
 * return a list  ofsearchproduct paginated.
 * @param {object} event - The http event.
 * @param {object} context - The context.
 * @param {callback} callback - callback method to return the response.
 * @return {json} The response.
 */
module.exports.getAll = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false

  let selectedPage = (event.hasOwnProperty('queryStringParameters') && event.queryStringParameters !== null) ? parseInt(event.queryStringParameters.page) : 1

  if (selectedPage < 1) { selectedPage = 1 }

  connectToDatabase()
    .then(() => {
      Category.paginate({}, { page: selectedPage, limit: 10 })
        .then(products => callback(null, {
          statusCode: 200,
          body: JSON.stringify(products)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not fetch the notes.'
        }))
    })
}

/**
 * updated the searchObject data of given id.
 * @param {object} event - The http event.
 * @param {object} context - The context.
 * @param {callback} callback - callback method to return the response.
 * @return {json} The response.
 */
module.exports.update = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false

  connectToDatabase()
    .then(() => {
      let parsed = JSON.parse(event.body)
      Category.findByIdAndUpdate(event.pathParameters.id, parsed, { new: true }, function (err, product) {
        if (err) { return validate(err, callback) }
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(product)
        })
      })
    })
}
