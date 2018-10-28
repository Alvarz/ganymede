'use strict'

/** Mongose lib. */
const mongoose = require('mongoose')

/** Mongose pagination lib. */
const mongoosePaginate = require('mongoose-paginate')

/** updateable fields array. */
const updateable = ['status', 'products']

/** statuses array. */
const statusses = ['processing', 'fulfilled', 'failed']

/** providers array. */
const providers = ['easy', 'mercadolibre', 'amazon']

/** SearchOrder Shema. */
const SearchOrderSchema = new mongoose.Schema({
  query: {
    type: String,
    required: true
  },
  provider: {
    type: String,
    enum: providers,
    required: true
  },
  status: {
    type: String,
    enum: statusses,
    required: true,
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
  products: {
    type: [Object],
    default: []
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
SearchOrderSchema.plugin(mongoosePaginate)

/** exports. */
module.exports = mongoose.model('SearchOrder', SearchOrderSchema)
module.exports.providers = providers
module.exports.statusses = statusses
module.exports.updateable = updateable
