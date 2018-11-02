'use strict'
/** @module services/requestService */

/**  axios lib */
const axios = require('axios')

/**  the token of this app */
const token = process.env.TOKEN

/**  the configuration heaeder */
let config = {
  headers: {
    Authorization: 'Bearer ' + token
  }
}

/**
 * request to get values
 * @async
 * @param {string} url - The url.
 * @return {promise} The response.
 */
module.exports.get = async (url) => {
  return axios.get(url, config)
}

/**
 * request to post values
 * @async
 * @param {string} url - The url.
 * @param {object} data - The data to be posted.
 * @return {promise} The response.
 */
module.exports.post = async (url, data) => {
  return axios.post(url, data, config)
}

/**
 * request to post values
 * @async
 * @param {string} url - The url.
 * @param {object} data - The data to be updated.
 * @return {promise} The response.
 */
module.exports.put = async (url, data) => {
  return axios.put(url, data, config)
}
