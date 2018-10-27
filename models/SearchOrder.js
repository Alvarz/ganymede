'use strict'

/** Mongose lib. */
const mongoose = require('mongoose')

/** Mongose pagination lib. */
const mongoosePaginate = require('mongoose-paginate')

/** SearchOrder Shema. */

const statusses = ['processing', 'fulfilled', 'failed']

const providers = ['easy', 'mercadolibre', 'amazon']

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
}, { strict: true })

/** attach of the paginate plugin to the Schema. */
SearchOrderSchema.plugin(mongoosePaginate)

/** export. */
module.exports = mongoose.model('SearchOrder', SearchOrderSchema)
module.exports.providers = providers
module.exports.statusses = statusses
