'use strict'

/** @module controllers/CategoryController */

/** validation function. */
const { validate } = require('../services/validationService')

/** The conection to db method. */
const { connectToDatabase } = require('../db/db')

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
      /* create the new category */
      Category.create(JSON.parse(event.body), function (err, product) {
        if (err) { return validate(err, callback) }
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(product)
        })
      })
    })
    .catch(reason => {
      console.log('Promise rejected due (' + reason + ').')
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
      /* fonf category by id */
      Category.findById(event.pathParameters.id)
        .then(product => callback(null, {
          statusCode: 200,
          body: JSON.stringify(product)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          body: JSON.stringify({ message: 'Could not fetch the note.' })
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

  // get the pae
  let selectedPage = (event.hasOwnProperty('queryStringParameters') && event.queryStringParameters !== null) ? parseInt(event.queryStringParameters.page) : 1
  // validate page is not < than 0
  if (selectedPage < 1) { selectedPage = 1 }

  connectToDatabase()
    .then(() => {
      // fetch categories paginated
      Category.paginate({}, { page: selectedPage, limit: 10 })
        .then(products => callback(null, {
          statusCode: 200,
          body: JSON.stringify(products)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: JSON.stringify({ message: 'Could not fetch the note.' })
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
      // find category by id and updated it
      Category.findByIdAndUpdate(event.pathParameters.id, parsed, { new: true }, function (err, product) {
        if (err) { return validate(err, callback) }
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(product)
        })
      })
    })
}
