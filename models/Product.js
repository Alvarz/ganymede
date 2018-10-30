'use strict'

/** Mongose lib. */
const mongoose = require('mongoose')

/** Mongose pagination lib. */
const mongoosePaginate = require('mongoose-paginate')

/** Product Shema. */
const ProductSchema = new mongoose.Schema({
  sku: {
    type: Number, // stock keep unit
    required: false
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true,
    default: '0'
  },
  original_price: {
    type: String,
    required: false
  },
  category_id: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  images: {
    type: [String],
    required: false
  },
  link: {
    type: String,
    required: false
  },
  related_search_queries: {
    type: [String],
    required: false
  }
}, { timestamps: true }, { strict: true })

/** attach of the paginate plugin to the Schema. */
ProductSchema.plugin(mongoosePaginate)

/** export. */
module.exports = mongoose.model('Product', ProductSchema)
