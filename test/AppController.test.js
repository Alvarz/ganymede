'use strict'

const mongoose = require('mongoose')
const chai = require('chai')
const expect = require('chai').expect
const spies = require('chai-spies')
let categoryCtrl = require('../controllers/CategoryController')
const Category = require('../models/Category')
let { validate } = require('../services/validationService')

chai.use(spies)

let context, createSpy, getOneSpy, getAllSpy, updateSpy, validateSpy, toCreate, event

beforeEach(() => {
// Clear the cache, this can be done in a way described in the example repo. Does not have to happen here
  delete require.cache[require.resolve('../controllers/CategoryController')]

  // Update our reference, this needs to happen here
  categoryCtrl = require('../controllers/CategoryController')

  toCreate = {
    name: 'category' + Math.random(),
    description: 'description'
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

  createSpy = chai.spy(Category.create)
  Category.create = createSpy

  updateSpy = chai.spy(Category.update)
  Category.update = updateSpy

  getOneSpy = chai.spy(Category.getOne)
  Category.getOne = getOneSpy

  getAllSpy = chai.spy(Category.getAll)
  Category.getAll = getAllSpy
})

describe('[categoryController.create]', () => {
  it('creating new element with proper element ', async (done) => {
    event.body = JSON.stringify(toCreate)
    categoryCtrl.create(event, context)
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
    event.body.name = ''
    event.body = JSON.stringify(event.body)
    categoryCtrl.create(event, context)
      .then(() => {
        mongoose.connection.close()
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

describe('[categoryController.getOne]', () => {
  it('getting an element ', (done) => {
    categoryCtrl.getOne(event, context)
    /** this make us wait for the solved promise */
      .then(() => {
        console.log('then')
        expect(getOneSpy).to.be.called()
        expect(context.callbackWaitsForEmptyEventLoop).to.be.false
      })
      .catch(err => {
        expect(getOneSpy).not.be.called()
      })
    mongoose.connection.close()
    done()
  })
})

describe('[categoryController.getAll]', () => {
  it('getting all element ', (done) => {
    categoryCtrl.getAll(event, context)
    /** this make us wait for the solved promise */
      .then(() => {
        expect(getAllSpy).to.be.called()
        expect(context.callbackWaitsForEmptyEventLoop).to.be.false
      })
      .catch(() => {})
    mongoose.connection.close()
    done()
  })

  before(() => {
  })

  it('getting ll element with page ', (done) => {
    event = {
      queryStringParameters: { page: 1 }
    }

    categoryCtrl.getAll(event, context)
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

describe('[categoryController.update]', () => {
  event = {
    pathParameters: { id: '5bdb58042d81010e98a67051' }
  }

  it('updating an element ', (done) => {
    categoryCtrl.update(event, context)
    /** this make us wait for the solved promise */
      .then(() => {
        expect(updateSpy).to.be.called()
        expect(context.callbackWaitsForEmptyEventLoop).to.be.false
      })
      .catch(() => {})
    mongoose.connection.close()
    done()
  })

  it('updating an element no exist', (done) => {
    categoryCtrl.update(event, context)
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
