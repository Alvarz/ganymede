'use strict'
require('dotenv').config({ path: './.env' });
const SearchOrderCtrl = require('./controllers/SearchOrderController')

module.exports.create = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false
  return SearchOrderCtrl.create(event, context, callback)
}

module.exports.getOne = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false
  return SearchOrderCtrl.getOne(event, context, callback)
}

 module.exports.getAll = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false
  return SearchOrderCtrl.getAll(event, context, callback)
} 

module.exports.update = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false
  return SearchOrderCtrl.update(event, context, callback)
}

