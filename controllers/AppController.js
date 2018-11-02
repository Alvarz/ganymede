'use estrict'
/** @module controllers/AppController */

/** validation function. */
const { validate } = require('../services/validationService')

/** The conection to db method. */
const { connectToDatabase } = require('../db/db')

/** search product model. */
const App = require('../models/App')

/** search order model. */
const cleanObject = require('../utils/objects')
/**
 * Create a new App.
 * @param {object} event - The http event.
 * @param {object} context - The context.
 * @return {json} The response.
 */
module.exports.create = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false
  try {
    await connectToDatabase()
  } catch (err) {
    console.log(err)
  }

  /* create the new category */
  try {
    let appnew = JSON.parse(event.body)
    let uid = guid()
    appnew['token'] = uid
    let app = await App.create(appnew)
    return {
      statusCode: 200,
      body: JSON.stringify(app)
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
    console.log(err)
  }
  /* fonf category by id */
  try {
    let category = await App.findById(event.pathParameters.id)

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
 * @param {object} event - The http event.
 * @param {object} context - The context.
 * @return {json} The response.
 */
module.exports.getAll = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false

  // get the pae
  let selectedPage = (event.hasOwnProperty('queryStringParameters') && event.queryStringParameters !== null) ? parseInt(event.queryStringParameters.page) : 1
  // validate page is not < than 0
  if (selectedPage < 1) { selectedPage = 1 }

  try {
    await connectToDatabase()
  } catch (err) {
    console.log(err)
  }
  // fetch categories paginated
  //
  try {
    let categories = await App.paginate({}, { page: selectedPage, limit: 10 })
    return {
      statusCode: 200,
      body: JSON.stringify(categories)
    }
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({ message: 'Could not fetch the note.' })
    }
  }
}

/**
 * updated the searchObject data of given id.
 * @param {object} event - The http event.
 * @param {object} context - The context.
 * @return {json} The response.
 */
module.exports.update = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false

  try {
    await connectToDatabase()
  } catch (err) {
    console.log(err)
  }
  let parsed = JSON.parse(event.body)
  // find category by id and updated it

  // clean the request from unused fields
  const cleaned = cleanObject(parsed, App.updateable)
  try {
    let category = await App.findByIdAndUpdate(event.pathParameters.id, cleaned, { new: true })
    return {
      statusCode: 200,
      body: JSON.stringify(category)
    }
  } catch (err) {
    return validate(err)
  }
}

module.exports.auth = async (headers) => {
  if (!headers.hasOwnProperty('Authorization')) return false

  let ckunks = headers.Authorization.split(' ')

  if (ckunks.length < 2 || ckunks[0] !== 'Bearer') return false
  let token = ckunks[1]

  try {
    await connectToDatabase()
  } catch (err) {
    console.log(err)
    return false
  }

  let count = await App.countDocuments({ token: token })

  console.log(count)
  return count > 0
}

/**
 * guid generator
 * @return {json} The response.
 */
const guid = () => {
  function s4 () {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
}
