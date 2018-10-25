'use strict'

const mongoose = require('mongoose')

const SearchOrderSchema = new mongoose.Schema({
  query: String,
  provider: String,
  options: {
    user: String,
    password: String
  },
  callbackUrl: String
})

module.exports = mongoose.model('SearchOrder', SearchOrderSchema)
