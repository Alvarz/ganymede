'use strict'

/**    SearchOrderController methods */
const SearchOrderCtrl = require('../controllers/SearchOrderController')

/**   ComunicationController methods */
const { sendToExternalService } = require('../controllers/ComunicationController')

/**
 * check if must send an order to themisto
 * @return {json} the response.
 */
module.exports.checkIfSendToThemisto = () => {
  // is themisto ready?
  if (!global._isThemistoReady && process.env.USE_FLAG) {
    console.log('themisto is not ready')
    return
  }
  // set the global
  global._isThemistoReady = false
  // grab an order to send it
  SearchOrderCtrl.grabOrderToSendIt()
}

/**
 * @param {string} url - the url to send
 * @param {object} data - the data to be sended
 * @return {json} the response.
 */
module.exports.sendToExternal = (url, data) => {
  // set themisto to not ready
  global._isThemistoReady = false
  // send the data
  sendToExternalService(url, data)
}

/**
 * set themisto to ready
 * @return {void} the response.
 */
const setThemistoReady = () => {
  global._isThemistoReady = true
  this.checkIfSendToThemisto()
}

/** exports  */
module.exports.setThemistoReady = setThemistoReady
