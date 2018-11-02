'use strict'

/** @module controllers/ProductController */

const { validate } = require('../services/validationService')

/** The conection to db method. */
const { connectToDatabase } = require('../db/db')

/** search product model. */
const Product = require('../models/Product')

/**
 * Create a new Product.
 * @param {object} event - The http event.
 * @param {object} context - The context.
 * @return {json} The response.
 */
module.exports.create = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false
  try {
    await connectToDatabase()
  } catch (err) {
    console.log('Manejar promesa rechazada (' + err + ') aquí searchOrderController.')
  }

  try {
    let product = await Product.create(JSON.parse(event.body))
    return {
      statusCode: 200,
      body: JSON.stringify(product)
    }
  } catch (err) {
    return validate(err)
  }
}

/**
 * return one searchproduct by given id.
 * @param {object} event - The http event.
 * @param {object} context - The context.
 * @return {json} The response.
 */
module.exports.getOne = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false
  try {
    await connectToDatabase()
  } catch (err) {
    console.log('Manejar promesa rechazada (' + err + ') aquí searchOrderController.')
  }

  try {
    // find product by id
    let product = await Product.findById(event.pathParameters.id)
    return {
      statusCode: 200,
      body: JSON.stringify(product)
    }
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({ message: 'Could not fetch the product.' })
    }
  }
}

/**
 * return a list  ofsearchproduct paginated.
 * @param {object} event - The http event.
 * @param {object} context - The context.
 * @param {callback} callback - callback method to return the response.
 * @return {json} The response.
 */
module.exports.getAll = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false

  // get the page from the request
  let selectedPage = (event.hasOwnProperty('queryStringParameters') && event.queryStringParameters !== null) ? parseInt(event.queryStringParameters.page) : 1

  if (selectedPage < 1) { selectedPage = 1 }

  try {
    await connectToDatabase()
  } catch (err) {
    console.log('Manejar promesa rechazada (' + err + ') aquí searchOrderController.')
  }

  try {
    // fetch products paginated
    let products = await Product.paginate({}, { page: selectedPage, limit: 10 })
    return {
      statusCode: 200,
      body: JSON.stringify(products)
    }
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({ message: 'Could not fetch the products.' })
    }
  }
}

/**
 * updated the searchObject data of given id.
 * @param {object} event - The http event.
 * @param {object} context - The context.
 * @param {callback} callback - callback method to return the response.
 * @return {json} The response.
 */
module.exports.update = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false

  try {
    await connectToDatabase()
  } catch (err) {
    console.log('Manejar promesa rechazada (' + err + ') aquí searchOrderController.')
  }

  try {
    // find a product by id and updated it
    let product = await Product.findByIdAndUpdate(event.pathParameters.id, parsed, { new: true })
    let parsed = JSON.parse(event.body)
    return {
      statusCode: 200,
      body: JSON.stringify(product)
    }
  } catch (err) {
    return validate(err)
  }
}
