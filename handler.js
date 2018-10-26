'use strict'

/** dotenv config. */
require('dotenv').config({ path: './.env' })

/** SearchOrderController instance. */
const SearchOrderCtrl = require('./controllers/SearchOrderController')

/**
 * Create request handler.
 * @param {object} event - The http event.
 * @param {object} context - The context.
 * @param {Function} callback - callback method to return the response.
 * @return {json} The response.
 */
module.exports.create = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false
  return SearchOrderCtrl.create(event, context, callback)
}

/**
 * getOne request handler.
 * @param {object} event - The http event.
 * @param {object} context - The context.
 * @param {Function} callback - callback method to return the response.
 * @return {json} The response.
 */
module.exports.getOne = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false
  return SearchOrderCtrl.getOne(event, context, callback)
}

/**
 * getAll request handler.
 * @param {object} event - The http event.
 * @param {object} context - The context.
 * @param {Function} callback - callback method to return the response.
 * @return {json} The response.
 */
module.exports.getAll = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false
  return SearchOrderCtrl.getAll(event, context, callback)
}

/**
 * update request handler.
 * @param {object} event - The http event.
 * @param {object} context - The context.
 * @param {Function} callback - callback method to return the response.
 * @return {json} The response.
 */
module.exports.update = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false
  return SearchOrderCtrl.update(event, context, callback)
}
