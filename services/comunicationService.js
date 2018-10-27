const { sendToExternalService } = require('../controller/ComunicationController')

/**
 * Send the data to themisto.
 * @param {object} data - The data to be sended
 * @return {json} The response.
 */
module.exports.sendToThemisto = (data) => {
  const themisto = process.env.THEMITO_HOST || 'localhost'
  let sended = sendToExternalService(themisto, data)
  console.log(sended)
  return sended
}
