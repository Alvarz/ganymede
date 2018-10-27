
const { connectToDatabase } = require('../db/db')
const { post } = require('../services/requestService')

const { isThemistoReady } = require('../services/comunicationService')
const { validateSearchUpdate, validate } = require('../services/validationService')
const { updateable } = require('../models/SearchOrder')
const SearchOrder = require('../models/SearchOrder')
const Product = require('../models/Product')
const { cleanObject } = require('../utils/objects')
/**
 * Create a new SearchOrder.
 * @param {string} url - The other url.
 * @param {object} data - The data to be sended.
 * @return {json} The response.
 */
module.exports.sendToExternalService = (url, data) => {
  post(url, data)
    .then(resp => {
      return resp.data
    }).catch(err => {
      console.error(err)
    })
}

/**
 * Create a new SearchOrder.
 * @param {string} url - The other url.
 * @param {object} data - The data to be sended.
 * @return {json} The response.
 */
module.exports.callback = (event, context, callback) => {
  // connect to the db o retrive the current connection
  connectToDatabase()
    .then(() => {
      // parse string to json
      let parsed = JSON.parse(event.body)

      // validate if the status is un the stausses model's array
      validateSearchUpdate(parsed.status, callback)
      // clean the request from unupdatables elements
      const cleaned = cleanObject(parsed, updateable)

      // search the order and update it
      SearchOrder.findByIdAndUpdate(event.pathParameters.id, cleaned, { new: true }, function (err, order) {
        // check for errors
        if (err) { return validate(err, callback) }
        // save tue products on the db
        saveProducts(parsed)
        // return http response
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(order)
        })
      })
    })
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

/**
 * Create a new product.
 * @param {object} _product -
 * @return {void} The response.
 */
const saveProduct = (_product) => {
  // store the new product
  Product.create(_product, function (err, product) {
    if (err) { return err }

    return product
  })
}
