'use strict'

const mongoose = require('mongoose')
const chai = require('chai')
const expect = require('chai').expect
const spies = require('chai-spies')
let searchOrderCtrl = require('../controllers/SearchOrderController')
const SearchOrder = require('../models/SearchOrder')
let { validate } = require('../services/validationService')
let comunicationService = require('../services/comunicationService')
const db = require('../db/db')

chai.use(spies)

let order, context, createSpy, getOneSpy, getAllSpy, updateSpy, validateSpy, toCreate, event, sendToExternalSpy

/** mock db connection */
db.connectToDatabase = () => {
  return new Promise((reject, resolve) => {
    resolve()
  })
}
/** mock sendtoTheisto */
comunicationService.sendToExternal = (order) => {
  return true
}

beforeEach(() => {
// Clear the cache, this can be done in a way described in the example repo. Does not have to happen here
  delete require.cache[require.resolve('../controllers/SearchOrderController')]

  // Update our reference, this needs to happen here
  searchOrderCtrl = require('../controllers/SearchOrderController')

  order = {
    _id: 'kjh231',
    toObject: () => {
      return this
    }
  }

  toCreate = {
    query: 'television',
	  provider: 'amazon',
	  options: {
      user: 'theuser',
      password: 'thepassword'

    },
    callbackUrl: 'http://my-endpoint.com/results'
  }

  context = {
    callbackWaitsForEmptyEventLoop: true
  }

  event = {
    pathParameters: {
      id: 'jk12321jhk32h1j'
    },
    body: ''
  }
  validateSpy = chai.spy(validate)
  validate = validateSpy

  createSpy = chai.spy(SearchOrder.create)
  SearchOrder.create = createSpy

  updateSpy = chai.spy(SearchOrder.update)
  SearchOrder.update = updateSpy

  getOneSpy = chai.spy(SearchOrder.getOne)
  SearchOrder.getOne = getOneSpy

  getAllSpy = chai.spy(SearchOrder.getAll)
  SearchOrder.getAll = getAllSpy

  sendToExternalSpy = chai.spy(comunicationService.sendToExternal)
  comunicationService.sendToExternal = sendToExternalSpy
})

describe('[searchOrderController.create]', () => {
  it('creating new element with proper element ', async (done) => {
    event.body = JSON.stringify(toCreate)
    searchOrderCtrl.create(event, context)
      .then(() => {
        expect(createSpy).to.be.called()
        expect(validateSpy).not.be.called()
      })
      .catch(() => {})
    mongoose.connection.close()
    done()
  })

  it('creating new element with no proper element ', (done) => {
    event.body = toCreate
    event.body.query = ''
    event.body = JSON.stringify(event.body)
    searchOrderCtrl.create(event, context)
      .then(() => {
        expect(createSpy).to.be.called()
        // expect(validateSpy).to.be.called()
      })
      .catch(err => {
        expect(validateSpy).to.be.called()
      })
    mongoose.connection.close()
    done()
  })
})

describe('[searchOrderController.getOne]', () => {
  it('getting an element ', (done) => {
    searchOrderCtrl.getOne(event, context)
    /** this make us wait for the solved promise */
      .then(() => {
        expect(getOneSpy).to.be.called()
        expect(context.callbackWaitsForEmptyEventLoop).to.be.false
      })
      .catch(() => {})
    mongoose.connection.close()
    done()
  })
})

describe('[searchOrderController.getAll]', () => {
  it('getting an element ', (done) => {
    searchOrderCtrl.getAll(event, context)
    /** this make us wait for the solved promise */
      .then(() => {
        expect(getAllSpy).to.be.called()
        expect(context.callbackWaitsForEmptyEventLoop).to.be.false
      })
      .catch(() => {})
    mongoose.connection.close()
    done()
  })
})

describe('[searchOrderController.update]', () => {
  it('updating an element ', (done) => {
    searchOrderCtrl.update(event, context)
    /** this make us wait for the solved promise */
      .then(() => {
        expect(updateSpy).to.be.called()
        expect(context.callbackWaitsForEmptyEventLoop).to.be.false
      })
      .catch(() => {})
    mongoose.connection.close()
    done()
  })
})

/* describe('[searchOrderController.sendToThemisto]', () => {
  it.only('sending data to themisto', async (done) => {
    searchOrderCtrl.sendToThemisto(order)
    // expect(sendToExternalSpy).to.be.called()
  })
}) */
