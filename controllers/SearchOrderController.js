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
 * @param {callback} callback - callback method to return the response.
 * @return {json} The response.
 */
module.exports.create = (event, context, callback) => {
  connectToDatabase()
    .then(() => {
      // create orders
      SearchOrder.create(JSON.parse(event.body), function (err, order) {
        if (err) { return validate(err, callback) }
        // check if themisto is ready and send orders to it
        checkIfSendToThemisto()
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(order)
        })
      })
    })
    .catch(reason => {
      console.log('Manejar promesa rechazada (' + reason + ') aquí searchOrderController.')
    })
}

/**
 * return one searchOrder by given id.
 * @param {object} event - The http event.
 * @param {object} context - The context.
 * @param {callback} callback - callback method to return the response.
 * @return {json} The response.
 */
module.exports.getOne = (event, context, callback) => {
  connectToDatabase()
    .then(() => {
      // find an search order
      SearchOrder.findById(event.pathParameters.id)
        .then(order => callback(null, {
          statusCode: 200,
          body: JSON.stringify(order)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          body: JSON.stringify({ message: 'Could not fetch the product.' })
        }))
    })
}

/**
 * return a list  ofsearchOrder paginated.
 * @param {object} event - The http event.
 * @param {object} context - The context.
 * @param {callback} callback - callback method to return the response.
 * @return {json} The response.
 */
module.exports.getAll = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false

  // get the selected page from request
  let selectedPage =
    (event.hasOwnProperty('queryStringParameters') && event.queryStringParameters !== null) ? parseInt(event.queryStringParameters.page) : 1

  if (selectedPage < 1) { selectedPage = 1 }

  connectToDatabase()
    .then(() => {
    // fetch orders paginated
      SearchOrder.paginate({}, { page: selectedPage, limit: 10 })
        .then(orders => callback(null, {
          statusCode: 200,
          body: JSON.stringify(orders)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          body: JSON.stringify({ message: 'Could not fetch the product.' })
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
      // validated that the fields has a proper status name
      validateSearchUpdate(parsed.status, callback)
      // clean the request from unused fields
      const cleaned = cleanObject(parsed, SearchOrder.updateable)
      // find the order and updated it
      SearchOrder.findByIdAndUpdate(event.pathParameters.id, cleaned, { new: true }, function (err, order) {
        if (err) { return validate(err, callback) }
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(order)
        })
      })
    })
}

/**
 * grab an un processed order to send it
 * @return {void} .
 */
module.exports.grabOrderToSendIt = () => {
  connectToDatabase()
    .then(() => {
      // search an order with state processing to send it
      SearchOrder.where('status').equals('processing').limit(1).sort('created_at')
        .then(res => {
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
        })
        .catch(err => {
          // if there was an error, try again
          setThemistoReady()
          console.log('Promise rejected due (' + err + ')')
        })
    })
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
  let sended = sendToExternal(themisto + '/api/queries', order)
  return sended
}
