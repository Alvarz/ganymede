'use strict'

/** Mongose lib. */
const mongoose = require('mongoose')

/** Mongose pagination lib. */
const mongoosePaginate = require('mongoose-paginate')

/** SearchOrder Shema. */
const SearchOrderSchema = new mongoose.Schema({
  query: {
    type: String,
    required: true
  },
  provider: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'processing'
  },
  options: {
    user: {
      type: String,
      required: false
    },
    password: {
      type: String,
      required: false
    }
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
  callbackUrl: {
    type: String,
    required: false
  }
})

/** attach of the paginate plugin to the Schema. */
SearchOrderSchema.plugin(mongoosePaginate)

/** export. */
module.exports = mongoose.model('SearchOrder', SearchOrderSchema)
