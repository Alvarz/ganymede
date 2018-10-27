'use strict'

const SearchOrderCtrl = require('../controllers/SearchOrderController')
const { sendToExternalService } = require('../controllers/ComunicationController')

const setThemistoReady = () => {
  global._isThemistoReady = true
  this.checkIfSendToThemisto()
}
/**
 * check if must send an order to themisto
 * @return {json} the response.
 */
module.exports.checkIfSendToThemisto = () => {
  if (!global._isThemistoReady) {
    console.log('themisto is not ready')
    return
  }

  global._isThemistoReady = false
  SearchOrderCtrl.grabOrderToSendIt()
  /* const intervalid = setInterval(() => {
    console.log('requesting to themisto')
    cleanCurrentInterval(intervalid)
    // sendToThemisto(order[0])
  }, 1500) */
}

/**
 * @param {string} url - the url to send
 * @param {object} data - the data to be sended
 * @return {json} the response.
 */
module.exports.sendToExternal = (url, data) => {
  global._isThemistoReady = false
  sendToExternalService(url, data)
}

module.exports.setThemistoReady = setThemistoReady
