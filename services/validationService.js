'use strict'
/** @module services/validationService */

/** statuses enum array */
var { statusses } = require('../models/SearchOrder')

/**
 * Validate the enums on model.
 * @param {object} data - The data to be validated.
 * @return {json} The response.
 */
module.exports.validateSearchUpdate = (data) => {
  if (!statusses.includes(data)) {
    return {
      statusCode: 402,
      body: JSON.stringify({
        message: `${data} is not a proper status for search order`
      })
    }
  }
}
/**
 * validate the data.
 * @param {object} data - data to be validated
 * @return {object}.
 */
module.exports.validate = (data) => {
  let errors = []
  /** if has no errors, return */
  if (!data || !data.hasOwnProperty('errors')) {
    return {
      statusCode: 402,
      body: JSON.stringify({
        message: 'There is errors on request'
      })
    }
  }

  /**  if has errors get the messages */
  for (let key in data.errors) {
    let msg = data.errors[key].message || ''

    let err = {
      'key': key,
      'message': msg
    }
    errors.push(err)
  }
  return {
    statusCode: data.statusCode || 402,
    body: JSON.stringify({
      message: 'There is validation errors',
      data: errors
    })
  }
}
