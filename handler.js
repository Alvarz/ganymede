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
  return SearchOrderCtrl.create(event, context)
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
  return SearchOrderCtrl.getOne(event, context)
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
  return SearchOrderCtrl.getAll(event, context)
}

/**
 * update request handler.
 * @param {object} event - The http event.
 * @param {object} context - The context.
 * @param {Function} callback - callback method to return the response.
 * @return {json} The response.
 */
module.exports.updateSearchOrder = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false
  let allowed = await AppCtrl.auth(event.headers)
  if (!allowed) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: 'Unauthorized' })
    }
  }
  return SearchOrderCtrl.update(event, context)
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
module.exports.createProduct = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false
  let allowed = await AppCtrl.auth(event.headers)
  if (!allowed) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: 'Unauthorized' })
    }
  }
  return ProductCtrl.create(event, context)
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

  return ProductCtrl.getOne(event, context)
}

/**
 * getAll request handler.
 * @param {object} event - The http event.
 * @param {object} context - The context.
 * @param {Function} callback - callback method to return the response.
 * @return {json} The response.
 */
module.exports.getAllProduct = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false
  let allowed = await AppCtrl.auth(event.headers)
  if (!allowed) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: 'Unauthorized' })
    }
  }
  return ProductCtrl.getAll(event, context)
}

/**
 * update request handler.
 * @param {object} event - The http event.
 * @param {object} context - The context.
 * @param {Function} callback - callback method to return the response.
 * @return {json} The response.
 */
module.exports.updateProduct = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false
  let allowed = await AppCtrl.auth(event.headers)
  if (!allowed) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: 'Unauthorized' })
    }
  }
  return ProductCtrl.update(event, context)
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
module.exports.createCategory = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false
  let allowed = await AppCtrl.auth(event.headers)
  if (!allowed) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: 'Unauthorized' })
    }
  }
  return CategoryCtrl.create(event, context)
}

/**
 * getOne request handler.
 * @param {object} event - The http event.
 * @param {object} context - The context.
 * @param {Function} callback - callback method to return the response.
 * @return {json} The response.
 */
module.exports.getOneCategory = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false
  let allowed = await AppCtrl.auth(event.headers)
  if (!allowed) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: 'Unauthorized' })
    }
  }
  return CategoryCtrl.getOne(event, context)
}

/**
 * getAll request handler.
 * @param {object} event - The http event.
 * @param {object} context - The context.
 * @param {Function} callback - callback method to return the response.
 * @return {json} The response.
 */
module.exports.getAllCategory = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false
  let allowed = await AppCtrl.auth(event.headers)
  if (!allowed) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: 'Unauthorized' })
    }
  }
  return CategoryCtrl.getAll(event, context)
}

/**
 * update request handler.
 * @param {object} event - The http event.
 * @param {object} context - The context.
 * @param {Function} callback - callback method to return the response.
 * @return {json} The response.
 */
module.exports.updateCategory = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false
  let allowed = await AppCtrl.auth(event.headers)
  if (!allowed) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: 'Unauthorized' })
    }
  }
  return CategoryCtrl.update(event, context)
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
module.exports.callback = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false
  let allowed = await AppCtrl.auth(event.headers)
  if (!allowed) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: 'Unauthorized' })
    }
  }
  return ComunicationCtrl.callback(event, context)
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
module.exports.createApp = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false
  let allowed = await AppCtrl.auth(event.headers)
  if (!allowed) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: 'Unauthorized' })
    }
  }

  return AppCtrl.create(event, context)
}

/**
 * getOne request handler.
 * @param {object} event - The http event.
 * @param {object} context - The context.
 * @param {Function} callback - callback method to return the response.
 * @return {json} The response.
 */
module.exports.getOneApp = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false
  let allowed = await AppCtrl.auth(event.headers)
  if (!allowed) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: 'Unauthorized' })
    }
  }
  return AppCtrl.getOne(event, context)
}

/**
 * getAll request handler.
 * @param {object} event - The http event.
 * @param {object} context - The context.
 * @param {Function} callback - callback method to return the response.
 * @return {json} The response.
 */
module.exports.getAllApp = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false
  let allowed = await AppCtrl.auth(event.headers)
  if (!allowed) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: 'Unauthorized' })
    }
  }
  return AppCtrl.getAll(event, context)
}

/**
 * update request handler.
 * @param {object} event - The http event.
 * @param {object} context - The context.
 * @param {Function} callback - callback method to return the response.
 * @return {json} The response.
 */
module.exports.updateApp = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false
  let allowed = await AppCtrl.auth(event.headers)
  if (!allowed) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: 'Unauthorized' })
    }
  }
  return AppCtrl.update(event, context)
}
