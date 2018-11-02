'use strict'

const chai = require('chai')
const expect = require('chai').expect
const spies = require('chai-spies')
const comunicationService = require('../services/comunicationService')
const axios = require('axios')
const SearchOrderCtrl = require('../controllers/SearchOrderController')

chai.use(spies)
let spy, spyExternal

/** mock method */
/** statuses array to be tested */
let statusses, err

/** mock grabOrderToSendIt  for test purposes */
SearchOrderCtrl.grabOrderToSendIt = () => {
  return true
}

beforeEach(() => {
  spy = chai.spy(SearchOrderCtrl.grabOrderToSendIt)
  SearchOrderCtrl.grabOrderToSendIt = spy
})

describe('[comunicationService.checkIfSendToThemisto] test related to check if themisto is running and ready', () => {
  it('validate when themisto is ready', () => {
    global._isThemistoReady = true
    comunicationService.checkIfSendToThemisto()
    expect(spy).to.be.called()
  })

  it('validate when themisto is not ready', () => {
    global._isThemistoReady = false
    comunicationService.checkIfSendToThemisto()
    expect(spy).not.be.called()
  })
})

describe('[comunicationService.sendToExternal] test related to send the data to external services', () => {
  it('validate when send the data', () => {
    global._isThemistoReady = true
    comunicationService.sendToExternal('http://link.com', { name: 'john' })
    // expect(global._isThemistoReady).to.be.false
  })
})

describe('[comunicationService.setThemistoReady] test related to mark themisto as ready', () => {
  it('validate when send the data', () => {
    comunicationService.setThemistoReady()
    expect(spy).to.be.called()
  })
})
