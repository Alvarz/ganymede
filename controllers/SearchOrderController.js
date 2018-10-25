'use strict'
// const SearchOrder = require('../models/SearchOrder')
const mongoose = require('mongoose')
var SearchOrder = mongoose.model('SearchOrder')

module.exports.create = (event, context, callback) => {
  let body = event.body
  callback(null, {
    statusCode: 200,
    // body: JSON.stringify(body)
    body: body
  })
}

module.exports.getOne = (event, context, callback) => {
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({ 'response': 'hola mundo' })
  })
}
