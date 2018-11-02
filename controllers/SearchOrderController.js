'use strict'

/** @module controllers/SearchOrderController */

/** The conection to db method. */
const { connectToDatabase } = require('../db/db')

/** comunication service methods. */
const { checkIfSendToThemisto, sendToExternal, setThemistoReady } = require('../services/comunicationService')

/** validationService methods. */
const { validate, validateSearchUpdate } = require('../services/validationService')

/** search order model. */
const SearchOrder = require('../models/SearchOrder')

/** search order model. */
const cleanObject = require('../utils/objects')

/**
 * Create a new SearchOrder.
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
    let order = await SearchOrder.create(JSON.parse(event.body))
    checkIfSendToThemisto()
    return {
      statusCode: 200,
      body: JSON.stringify(order)
    }
  } catch (err) {
    return validate(err)
  }
}

/**
 * return one searchOrder by given id.
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
  // find an search order
  try {
    let order = await SearchOrder.findById(event.pathParameters.id)
    return {
      statusCode: 200,
      body: JSON.stringify(order)
    }
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({ message: 'Could not fetch the product.' })
    }
  }
}

/**
 * return a list  ofsearchOrder paginated.
 * @param {object} event - The http event.
 * @param {object} context - The context.
 * @return {json} The response.
 */
module.exports.getAll = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false

  // get the selected page from request
  let selectedPage =
    (event.hasOwnProperty('queryStringParameters') && event.queryStringParameters !== null) ? parseInt(event.queryStringParameters.page) : 1

  if (selectedPage < 1) { selectedPage = 1 }

  try {
    await connectToDatabase()
  } catch (err) {
    console.log('Manejar promesa rechazada (' + err + ') aquí searchOrderController.')
  }

  try {
    let orders = await SearchOrder.paginate({}, { page: selectedPage, limit: 10 })
    return {
      statusCode: 200,
      body: JSON.stringify(orders)
    }
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({ message: 'Could not fetch the product.' })
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
    console.log('Manejar promesa rechazada (' + err + ') aquí searchOrderController.')
  }

  let parsed = JSON.parse(event.body)
  // validated that the fields has a proper status name
  validateSearchUpdate(parsed.status)
  // clean the request from unused fields
  const cleaned = cleanObject(parsed, SearchOrder.updateable)

  try {
    let order = await SearchOrder.findByIdAndUpdate(event.pathParameters.id, cleaned, { new: true })
    return {
      statusCode: 200,
      body: JSON.stringify(order)
    }
  } catch (err) {
    return validate(err)
  }
  // find the order and updated it
}

/**
 * grab an un processed order to send it
 * @return {void} .
 */
module.exports.grabOrderToSendIt = async () => {
  try {
    await connectToDatabase()
  } catch (err) {
    console.log('Manejar promesa rechazada (' + err + ') aquí searchOrderController.')
  }

  try {
    let res = await SearchOrder.where('status').equals('processing').limit(1).sort('created_at')

    if (res.length > 0) {
      console.log('requesting to themisto')
      sendToThemisto(res[0])
    } else {
      setTimeout(() => {
        console.log('asking for new orders to send')
        // if there is no orders, ask again later
        setThemistoReady()
      }, 5000)
    }
  } catch (err) {
    // if there was an error, try again
    setThemistoReady()
    console.log('Promise rejected due (' + err + ')')
  }
  // search an order with state processing to send it
}

/**
 * send the data to themisto.
 * @param {object} data - the data to be sended
 * @return {json} the response.
 */
const sendToThemisto = (_order) => {
  // parsed searchOrder to object so we can add more properties to it
  let order = _order.toObject()
  // add the callback url
  order.callbackMain = 'http://localhost:3000/api/callback/' + order._id
  // get the themisto host from env
  const themisto = process.env.THEMITO_HOST || 'localhost'
  // send the query to themisto
  return sendToExternal(themisto + '/api/queries', order)
}

module.exports.sendToThemisto = sendToThemisto
