'use strict'

const { connectToDatabase } = require('../db/db')
const SearchOrder = require('../models/SearchOrder')
const mongoose = require('mongoose')

module.exports.create = (event, context, callback) => {
  connectToDatabase()
    .then(() => {
      SearchOrder.create(JSON.parse(event.body))
        .then(order => callback(null, {
          statusCode: 200,
          body: JSON.stringify(order)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not create the order.'
        }))
    })
}

module.exports.getOne = (event, context, callback) => {
  connectToDatabase()
    .then(() => {
      SearchOrder.findById(event.pathParameters.id)
        .then(order => callback(null, {
          statusCode: 200,
          body: JSON.stringify(order)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not fetch the note.'
        }))
    })
}

module.exports.getAll = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false

  let selectedPage = (event.hasOwnProperty('queryStringParameters') && event.queryStringParameters !== null) ? parseInt(event.queryStringParameters.page) : 1

  if (selectedPage < 1) { selectedPage = 1 }

  connectToDatabase()
    .then(() => {
      SearchOrder.paginate({}, { page: selectedPage, limit: 10 })
        .then(orders => callback(null, {
          statusCode: 200,
          body: JSON.stringify(orders)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not fetch the notes.'
        }))
    })
}

module.exports.update = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false

  connectToDatabase()
    .then(() => {
      SearchOrder.findByIdAndUpdate(event.pathParameters.id, JSON.parse(event.body), { new: true })
        .then(order => callback(null, {
          statusCode: 200,
          body: JSON.stringify(order)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not fetch the notes.'
        }))
    })
}
