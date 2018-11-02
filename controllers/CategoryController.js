'use estrict'
/** @module controllers/CategoryController */

/** validation function. */
const { validate } = require('../services/validationService')

/** The conection to db method. */
const { connectToDatabase } = require('../db/db')

/** search product model. */
const Category = require('../models/Category')

/**
 * Create a new Category.
 * @async
 * @param {object} event - The http event.
 * @param {object} context - The context.
 * @return {promise} The response.
 */
module.exports.create = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false
  try {
    /** connect to the db instance */
    await connectToDatabase()
  } catch (err) {
    console.log(err)
  }

  try {
    /* create the new category */
    let cat = await Category.create(JSON.parse(event.body))
    return {
      statusCode: 200,
      body: JSON.stringify(cat)
    }
  } catch (err) {
    /** if there was some error return the proper response */
    return validate(err)
  }
}

/**
 * return one searchproduct by given id.
 * @async
 * @param {object} event - The http event.
 * @param {object} context - The context.
 * @return {promise} The response.
 */
module.exports.getOne = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false
  try {
    /** connect to the db instance */
    await connectToDatabase()
  } catch (err) {
    console.log(err)
  }
  try {
  /* find category by id */
    let category = await Category.findById(event.pathParameters.id)

    return {
      statusCode: 200,
      body: JSON.stringify(category)
    }
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({ message: 'Could not fetch the note.' })
    }
  }
}

/**
 * return a list  ofsearchproduct paginated.
 * @async
 * @param {object} event - The http event.
 * @param {object} context - The context.
 * @return {promise} The response.
 */
module.exports.getAll = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false

  // get the page
  let selectedPage = (event.hasOwnProperty('queryStringParameters') && event.queryStringParameters !== null) ? parseInt(event.queryStringParameters.page) : 1
  // validate page is not < than 0
  if (selectedPage < 1) { selectedPage = 1 }

  try {
    /** connect to the db instance */
    await connectToDatabase()
  } catch (err) {
    console.log(err)
  }
  //
  try {
    /* fetch categories paginated */
    let categories = await Category.paginate({}, { page: selectedPage, limit: 10 })
    return {
      statusCode: 200,
      body: JSON.stringify(categories)
    }
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({ message: 'Could not fetch the note.' })
    }
  }
}

/**
 * updated the searchObject data of given id.
 * @async
 * @param {object} event - The http event.
 * @param {object} context - The context.
 * @return {promise} The response.
 */
module.exports.update = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false

  try {
    /** connect to the db instance */
    await connectToDatabase()
  } catch (err) {
    console.log(err)
  }
  /** parse from string to object */
  let parsed = JSON.parse(event.body)
  //
  try {
  // find category by id and updated it
    let category = await Category.findByIdAndUpdate(event.pathParameters.id, parsed, { new: true })
    return {
      statusCode: 200,
      body: JSON.stringify(category)
    }
  } catch (err) {
    /** if there was some error return the proper response */
    return validate(err)
  }
}
