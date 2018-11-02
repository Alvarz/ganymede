'use strict'
global._isThemistoReady = true
/** dotenv config. */
require('dotenv').config({ path: './.env' })

/** SearchOrderController instance. */
const SearchOrderCtrl = require('./controllers/SearchOrderController')

/** ProductController instance. */
const ProductCtrl = require('./controllers/ProductController')

/** CategoryController instance. */
const CategoryCtrl = require('./controllers/CategoryController')

/** ComunicationController instance. */
const ComunicationCtrl = require('./controllers/ComunicationController')

/** AppController instance. */
const AppCtrl = require('./controllers/AppController')
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
  let allowed = await AppCtrl.auth(event.headers)
  if (!allowed) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: 'Unauthorized' })
    }
  }
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
  let allowed = await AppCtrl.auth(event.headers)
  if (!allowed) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: 'Unauthorized' })
    }
  }
  return ProductCtrl.create(event, context, callback)
}

/**
 * getOne request handler.
 * @param {object} event - The http event.
 * @param {object} context - The context.
 * @param {Function} callback - callback method to return the response.
 * @return {json} The response.
 */
module.exports.getOneProduct = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false
  let allowed = await AppCtrl.auth(event.headers)
  if (!allowed) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: 'Unauthorized' })
    }
  }

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
  let allowed = await AppCtrl.auth(event.headers)
  if (!allowed) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: 'Unauthorized' })
    }
  }
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
  let allowed = await AppCtrl.auth(event.headers)
  if (!allowed) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: 'Unauthorized' })
    }
  }
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
  let allowed = await AppCtrl.auth(event.headers)
  if (!allowed) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: 'Unauthorized' })
    }
  }
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
  let allowed = await AppCtrl.auth(event.headers)
  if (!allowed) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: 'Unauthorized' })
    }
  }
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
  let allowed = await AppCtrl.auth(event.headers)
  if (!allowed) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: 'Unauthorized' })
    }
  }
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
  let allowed = await AppCtrl.auth(event.headers)
  if (!allowed) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: 'Unauthorized' })
    }
  }
  return CategoryCtrl.update(event, context, callback)
}

/*
 *
 * Comunication
 *
 * */

/**
 * the callback to receive.
 * @param {object} event - The http event.
 * @param {object} context - The context.
 * @param {Function} callback - callback method to return the response.
 * @return {json} The response.
 */
module.exports.callback = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false
  let allowed = await AppCtrl.auth(event.headers)
  if (!allowed) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: 'Unauthorized' })
    }
  }
  return ComunicationCtrl.callback(event, context, callback)
}

/*
 *
 * App
 *
 * */
/**
 * Create request handler.
 * @param {object} event - The http event.
 * @param {object} context - The context.
 * @param {Function} callback - callback method to return the response.
 * @return {json} The response.
 */
module.exports.createApp = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false
  let allowed = await AppCtrl.auth(event.headers)
  if (!allowed) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: 'Unauthorized' })
    }
  }
  return AppCtrl.create(event, context, callback)
}

/**
 * getOne request handler.
 * @param {object} event - The http event.
 * @param {object} context - The context.
 * @param {Function} callback - callback method to return the response.
 * @return {json} The response.
 */
module.exports.getOneApp = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false
  let allowed = await AppCtrl.auth(event.headers)
  if (!allowed) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: 'Unauthorized' })
    }
  }
  return AppCtrl.getOne(event, context, callback)
}

/**
 * getAll request handler.
 * @param {object} event - The http event.
 * @param {object} context - The context.
 * @param {Function} callback - callback method to return the response.
 * @return {json} The response.
 */
module.exports.getAllApp = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false
  let allowed = await AppCtrl.auth(event.headers)
  if (!allowed) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: 'Unauthorized' })
    }
  }
  return AppCtrl.getAll(event, context, callback)
}
