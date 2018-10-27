'use strict'

/** Mongose lib. */
const mongoose = require('mongoose')

/** Mongose pagination lib. */
const mongoosePaginate = require('mongoose-paginate')

/** updateable fields array. */

/** Category Shema. */
const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
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
CategorySchema.plugin(mongoosePaginate)

/** export. */
module.exports = mongoose.model('Category', CategorySchema)
