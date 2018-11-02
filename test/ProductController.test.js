'use strict'

const mongoose = require('mongoose')
const chai = require('chai')
const expect = require('chai').expect
const spies = require('chai-spies')
let productCtrl = require('../controllers/ProductController')
const Product = require('../models/Product')
let { validate } = require('../services/validationService')

chai.use(spies)

let context, createSpy, getOneSpy, getAllSpy, updateSpy, validateSpy, toCreate, event

beforeEach(() => {
// Clear the cache, this can be done in a way described in the example repo. Does not have to happen here
  delete require.cache[require.resolve('../controllers/ProductController')]

  // Update our reference, this needs to happen here
  productCtrl = require('../controllers/ProductController')

  toCreate = {
    name: 'Samsung 49NU7105 - Smart TV de 49" 4K UHD HDR (Pantalla Slim, Quad-Core, 3 HDMI, 2 USB), Color Negro (Carbon Black)',
    link: 'https://www.amazon.es/Samsung-UE49NU7105K-Smart-Pantalla-Quad-Core/dp/B07BZG52H2/ref=lp_934359031_1_27',
    price: '488,80',
    original_price: '649,00',
    description: 'Samsung 49NU7105 - Smart TV de 49" 4K UHD HDR (Pantalla Slim, Quad-Core, 3 HDMI, 2 USB), Color Negro (Carbon Black)',
    sku: null,
    category_id: '',
    related_search_queries: [],
    images: ['image', 'image']
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

  createSpy = chai.spy(Product.create)
  Product.create = createSpy

  updateSpy = chai.spy(Product.update)
  Product.update = updateSpy

  getOneSpy = chai.spy(Product.getOne)
  Product.getOne = getOneSpy

  getAllSpy = chai.spy(Product.getAll)
  Product.getAll = getAllSpy
})

describe('[productController.create]', () => {
  it('creating new element with proper element ', async (done) => {
    event.body = JSON.stringify(toCreate)
    productCtrl.create(event, context)
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
    productCtrl.create(event, context)
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

describe('[productController.getOne]', () => {
  it('getting an element ', (done) => {
    productCtrl.getOne(event, context)
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

describe('[productController.getAll]', () => {
  it('getting an element ', (done) => {
    productCtrl.getAll(event, context)
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

describe('[productController.update]', () => {
  it('updating an element ', (done) => {
    productCtrl.update(event, context)
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
