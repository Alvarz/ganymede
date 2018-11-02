'use strict'

/**  axios lib */
const axios = require('axios')

const token = '45c39c33-0da9-bd28-64cf-f9acbc48f12f'
let config = {
  headers: {
    Authorization: 'Bearer ' + token
  }
}

/**
 * request to get values
 * @param {string} url - The url.
 * @return {object} The response.
 */
module.exports.get = (url) => {
  return axios.get(url, config)
}

/**
 * request to post values
 * @param {string} url - The url.
 * @param {object} data - The data to be posted.
 * @return {object} The response.
 */
module.exports.post = (url, data) => {
  return axios.post(url, data, config)
}

/**
 * request to post values
 * @param {string} url - The url.
 * @param {object} data - The data to be updated.
 * @return {object} The response.
 */
module.exports.put = (url, data) => {
  return axios.put(url, data, config)
}
