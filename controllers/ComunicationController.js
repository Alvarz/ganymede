'use strict'

/**  db instance creator  */
const { connectToDatabase } = require('../db/db')

/**  post method from requester  */
const { post } = require('../services/requestService')

/**  the comunication service  */
const comunicationService = require('../services/comunicationService')

/**  validation service methods  */
const { validateSearchUpdate, validate } = require('../services/validationService')

/**  SearchOrder model  */
const SearchOrder = require('../models/SearchOrder')

/**  product model  */
const Product = require('../models/Product')

/**  object's cleaner helper  */
const { cleanObject } = require('../utils/objects')
/**
 * Create a new SearchOrder.
 * @param {string} url - The other url.
 * @param {object} data - The data to be sended.
 * @return {json} The response.
 */
module.exports.sendToExternalService = async (url, data) => {
  // send the data to an external service
  //
  try {
    let resp = await post(url, data)
    return resp.data
  } catch (err) {
    console.log('Promise rejected due (' + err.message + '), themisto is not online')
    setTimeout(() => {
      // if request fails, try again later
      comunicationService.setThemistoReady()
    }, 5000)
  }
}

/**
 * we recieve a connection throught our callback url
 * @param {string} url - The other url.
 * @param {object} data - The data to be sended.
 * @return {json} The response.
 */
module.exports.callback = async (event, context) => {
  // connect to the db o retrive the current connection

  context.callbackWaitsForEmptyEventLoop = false
  try {
    await connectToDatabase()
  } catch (err) {
    console.log('Promise rejected due (' + err.message + '), themisto is not online')
    setTimeout(() => {
      // if request fails, try again later
      comunicationService.setThemistoReady()
    }, 5000)
  }
  // parse string to json
  let parsed = JSON.parse(event.body)

  // validate if the status is un the stausses model's array
  validateSearchUpdate(parsed.status)
  // clean the request from unupdatables elements
  const cleaned = cleanObject(parsed, SearchOrder.updateable)

  try {
  // search the order and update it
    let order = await SearchOrder.findByIdAndUpdate(event.pathParameters.id, cleaned, { new: true })
    // save tue products on the db
    saveProducts(parsed)
    // we are ready to send new orders
    comunicationService.setThemistoReady()
    return {
      statusCode: 200,
      body: JSON.stringify(order)
    }
  } catch (err) {
    return validate(err)
  }
  // check for errors
}
/**
 * iterate over products to save them
 * @param { object } body - The data to be sended.
 * @return { void } The response.
 */
const saveProducts = (body) => {
  // if no products return

  if (!body.hasOwnProperty('products')) { return }

  // iterate over products to save them
  let products = body.products
  Object.keys(products).forEach((key) => {
    saveProduct(products[key])
  })
}

module.exports.saveProducts = saveProducts

/**
 * Create a new product.
 * @param {object} _product -
 * @return {void} The response.
 */
const saveProduct = (_product) => {
  // store the new product
  Product.create(_product, function (err, product) {
    if (err) { console.warn(err) }

    return product
  })
}

module.exports.saveProduct = saveProduct
