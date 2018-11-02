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
 * @async
 * @param {object} event - The http event.
 * @param {object} context - The context.
 * @return {promise} The response.
 */
module.exports.create = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false
  try {
    /** connect to the db */
    await connectToDatabase()
  } catch (err) {
    console.log(err)
  }

  /* create the new category */
  try {
    /** parse the string as object */
    let appnew = JSON.parse(event.body)
    /** generate uid */
    let uid = guid()
    appnew['token'] = uid
    /** save the new element */
    let app = await App.create(appnew)
    /** return the response */
    return {
      statusCode: 200,
      body: JSON.stringify(app)
    }
  } catch (err) {
    /**
     * if there was some error, we validated it and return the proper message
     * */
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
  /* find category by id */
  try {
    let category = await App.findById(event.pathParameters.id)

    /** return the response */
    return {
      statusCode: 200,
      body: JSON.stringify(category)
    }
  } catch (err) {
    /** there was some error return 500 */
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

  /** get the page */
  let selectedPage = (event.hasOwnProperty('queryStringParameters') && event.queryStringParameters !== null) ? parseInt(event.queryStringParameters.page) : 1
  /** validate page is not < than 0 */
  if (selectedPage < 1) { selectedPage = 1 }

  try {
    /** connect to the db instance */
    await connectToDatabase()
  } catch (err) {
    console.log(err)
  }
  try {
  /** fetch categories paginated and return the response */
    let categories = await App.paginate({}, { page: selectedPage, limit: 10 })
    return {
      statusCode: 200,
      body: JSON.stringify(categories)
    }
  } catch (err) {
    /** there was some error return 500 */
    return {
      statusCode: err.statusCode || 500,
      headers: { 'Content-Type': 'text/plain' },
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
  let parsed = JSON.parse(event.body)

  /** clean the request from unused fields */
  const cleaned = cleanObject(parsed, App.updateable)
  try {
  /* find category by id and updated it */
    let category = await App.findByIdAndUpdate(event.pathParameters.id, cleaned, { new: true })
    return {
      statusCode: 200,
      body: JSON.stringify(category)
    }
  } catch (err) {
    return validate(err)
  }
}

/**
 * authenticate the app who is requesting.
 * @async
 * @param {object} headers - The request headers.
 * @return {promise} The response.
 */
module.exports.auth = async (headers) => {
  /** if the headers hasn't auth key not allow */
  if (!headers.hasOwnProperty('Authorization')) return false

  /** if the headers has the auth key, split it */
  let ckunks = headers.Authorization.split(' ')

  /** validate is a proper bearer token */
  if (ckunks.length < 2 || ckunks[0] !== 'Bearer') return false

  /* get the actual token */
  let token = ckunks[1]

  try {
    /** connect to the db instance */
    await connectToDatabase()
  } catch (err) {
    console.log(err)
    return false
  }

  /** get the number of elements who match with that token (max 1) */
  let count = await App.countDocuments({ token: token })

  /* if count > 0, allow the request */
  return count > 0
}

/**
 * guid generator
 * @return {string} The response.
 */
const guid = () => {
  function s4 () {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
}
