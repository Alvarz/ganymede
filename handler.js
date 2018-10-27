'use strict'

/** dotenv config. */
require('dotenv').config({ path: './.env' })

/** SearchOrderController instance. */
const SearchOrderCtrl = require('./controllers/SearchOrderController')

/** ProductController instance. */
const ProductCtrl = require('./controllers/ProductController')

/** CategoryController instance. */
const CategoryCtrl = require('./controllers/CategoryController')

/** CategoryController instance. */
const ComunicationCtrl = require('./controllers/ComunicationController')
/*
 *
 * Search Orders
 *
 * */

/**
 * Create request handler.
 * @param {object} event - The http event.
 * @param {object} context - The context.
 * @param {Function} callback - callback method to return the response.
 * @return {json} The response.
 */
module.exports.createSearchOrder = (event, context, callback) => {
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
module.exports.getOneSearchOrder = (event, context, callback) => {
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
module.exports.getAllSearchOrder = (event, context, callback) => {
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
module.exports.updateSearchOrder = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false
  return SearchOrderCtrl.update(event, context, callback)
}

/*
 *
 * products
 *
 * */

/**
 * Create request handler.
 * @param {object} event - The http event.
 * @param {object} context - The context.
 * @param {Function} callback - callback method to return the response.
 * @return {json} The response.
 */
module.exports.createProduct = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false
  return ProductCtrl.create(event, context, callback)
}

/**
 * getOne request handler.
 * @param {object} event - The http event.
 * @param {object} context - The context.
 * @param {Function} callback - callback method to return the response.
 * @return {json} The response.
 */
module.exports.getOneProduct = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false
  return ProductCtrl.getOne(event, context, callback)
}

/**
 * getAll request handler.
 * @param {object} event - The http event.
 * @param {object} context - The context.
 * @param {Function} callback - callback method to return the response.
 * @return {json} The response.
 */
module.exports.getAllProduct = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false
  return ProductCtrl.getAll(event, context, callback)
}

/**
 * update request handler.
 * @param {object} event - The http event.
 * @param {object} context - The context.
 * @param {Function} callback - callback method to return the response.
 * @return {json} The response.
 */
module.exports.updateProduct = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false
  return ProductCtrl.update(event, context, callback)
}
/*
 *
 * Categories
 *
 * */
/**
 * Create request handler.
 * @param {object} event - The http event.
 * @param {object} context - The context.
 * @param {Function} callback - callback method to return the response.
 * @return {json} The response.
 */
module.exports.createCategory = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false
  return CategoryCtrl.create(event, context, callback)
}

/**
 * getOne request handler.
 * @param {object} event - The http event.
 * @param {object} context - The context.
 * @param {Function} callback - callback method to return the response.
 * @return {json} The response.
 */
module.exports.getOneCategory = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false
  return CategoryCtrl.getOne(event, context, callback)
}

/**
 * getAll request handler.
 * @param {object} event - The http event.
 * @param {object} context - The context.
 * @param {Function} callback - callback method to return the response.
 * @return {json} The response.
 */
module.exports.getAllCategory = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false
  return CategoryCtrl.getAll(event, context, callback)
}

/**
 * update request handler.
 * @param {object} event - The http event.
 * @param {object} context - The context.
 * @param {Function} callback - callback method to return the response.
 * @return {json} The response.
 */
module.exports.updateCategory = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false
  return CategoryCtrl.update(event, context, callback)
}

/*
 *
 * Comunication
 *
 * */
