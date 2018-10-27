'use strict'

/** Mongose lib. */
const mongoose = require('mongoose')

/** Mongose pagination lib. */
const mongoosePaginate = require('mongoose-paginate')

/** Product Shema. */
const ProductSchema = new mongoose.Schema({
  sku: {
    type: Number, // stock keep unit
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    default: 0
  },
  original_price: {
    type: Number,
    required: false
  },
  category_id: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  images: {
    type: [String],
    required: false
  },
  related_search_queries: {
    type: [String],
    required: false
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
}, { strict: true })

/** attach of the paginate plugin to the Schema. */
ProductSchema.plugin(mongoosePaginate)

/** export. */
module.exports = mongoose.model('Product', ProductSchema)