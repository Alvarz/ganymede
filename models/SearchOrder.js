'use strict'

const mongoose = require('mongoose')

const SearchOrderSchema = new mongoose.Schema({
  query: String,
  provider: String,
  status: { type: String, default: 'processing'},
  options: {
    user: String,
    password: String
  },
  callbackUrl: String
})

/*let SearchOrder
try {
  SearchOrder = mongoose.model('SearchOrder')
} catch (e) {
  SearchOrder = mongoose.model('SearchOrder', SearchOrderSchema)
}
module.exports = SearchOrder*/
module.exports = mongoose.model('SearchOrder', SearchOrderSchema)
