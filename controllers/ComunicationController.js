
const { post } = require('../services/requestService')

/**
 * Create a new SearchOrder.
 * @param {string} url - The other url.
 * @param {object} data - The data to be sended.
 * @return {json} The response.
 */
module.exports.sendToExternalService = (url, data) => {
  post(url, data)
    .then(resp => {
      return resp.data
    }).catch(err => {
      console.error(err)
    })
}
