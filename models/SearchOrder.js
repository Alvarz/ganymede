'use strict'

const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate');


const SearchOrderSchema = new mongoose.Schema({
  query: { type: String, required: true },
  provider: { type: String, required: true },
  status: { type: String, default: 'processing'},
  options: {
    user: { type: String, required: false },
    password: { type: String, required: false },
  },
  created_at: { type: Date, default: Date.now},
  updated_at: { type: Date, default: Date.now},
  callbackUrl: { type: String, required: false },
})

/*let SearchOrder
try {
  SearchOrder = mongoose.model('SearchOrder')
} catch (e) {
  SearchOrder = mongoose.model('SearchOrder', SearchOrderSchema)
}
module.exports = SearchOrder*/
SearchOrderSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('SearchOrder', SearchOrderSchema)
