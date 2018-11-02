'use strict'

/** Mongose lib. */
const mongoose = require('mongoose')

/** Mongose pagination lib. */
const mongoosePaginate = require('mongoose-paginate')

/** updateable fields array. */
const updateable = ['name']

/** App Shema. */
const AppSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: false
  },
  token: {
    type: String,
    required: true,
    unique: true
  }
}, { timestamps: true }, { strict: true })

/** attach of the paginate plugin to the Schema. */
AppSchema.plugin(mongoosePaginate)

/** export. */
module.exports = mongoose.model('App', AppSchema)
