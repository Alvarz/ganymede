'use strict'

const chai = require('chai')
const requestService = require('../services/requestService')
const expect = require('chai').expect
const spies = require('chai-spies')
const searchOrder = require('../models/SearchOrder')
const product = require('../models/Product')
let comunicationCtrl = require('../controllers/ComunicationController')

chai.use(spies)

let spyCreate, spyPost, url, spySaveProduct

/** mock model method */
searchOrder.findByIdAndUpdate = (id, object, obj) => {
  return new Promise((resolve, reject) => {
    resolve({})
  })
}

/** mock model method */
product.create = (object) => {
  return new Promise((resolve, reject) => {
    resolve({})
  })
}

beforeEach(() => {
// Clear the cache, this can be done in a way described in the example repo. Does not have to happen here
  delete require.cache[require.resolve('../controllers/ComunicationController')]

  // Update our reference, this needs to happen here
  comunicationCtrl = require('../controllers/ComunicationController')

  url = 'https://jsonplaceholder.typicode.com/posts'
  spyPost = chai.spy(requestService.post)
  requestService.post = spyPost

  spyCreate = chai.spy(product.create)
  product.create = spyCreate

  spySaveProduct = chai.spy(comunicationCtrl.saveProduct)
  comunicationCtrl.saveProduct = spySaveProduct
})

describe('[comunicationController.sendToExternalService]', () => {
  it('send to external service', () => {
    comunicationCtrl.sendToExternalService(url, {})
      .then(() => {
        expect(spyPost).to.be.called()
      })
      .catch(() => {})
  })
})

describe('[comunicationController.callback]', () => {
  it('callback method', () => {
    comunicationCtrl.sendToExternalService(url, {})
      .then(() => {
        expect(spyPost).to.be.called()
        expect(spyCreate).to.be.called()
        expect(spySaveProduct).to.be.called()
      })
      .catch(() => {})
  })
})

describe('[comunicationController.saveProducts]', () => {
  it('save products method', () => {
    let body = {
      products: [{ name: 'Samsung 49NU7105 - Smart TV de 49" 4K UHD HDR (Pantalla Slim, Quad-Core, 3 HDMI, 2 USB), Color Negro (Carbon Black)',
        link: 'https://www.amazon.es/Samsung-UE49NU7105K-Smart-Pantalla-Quad-Core/dp/B07BZG52H2/ref=lp_934359031_1_27',
        price: '488,80',
        original_price: '649,00',
        description: 'Samsung 49NU7105 - Smart TV de 49" 4K UHD HDR (Pantalla Slim, Quad-Core, 3 HDMI, 2 USB), Color Negro (Carbon Black)',
        sku: null,
        category_id: '',
        related_search_queries: [],
        images: [Array] }]
    }
    comunicationCtrl.saveProducts(body)
    expect(spyCreate).to.be.called()
  })
})

describe('[comunicationController.saveProducts]', () => {
  it('save products method', () => {
    let body = {
      products: [{ name: 'Samsung 49NU7105 - Smart TV de 49" 4K UHD HDR (Pantalla Slim, Quad-Core, 3 HDMI, 2 USB), Color Negro (Carbon Black)',
        link: 'https://www.amazon.es/Samsung-UE49NU7105K-Smart-Pantalla-Quad-Core/dp/B07BZG52H2/ref=lp_934359031_1_27',
        price: '488,80',
        original_price: '649,00',
        description: 'Samsung 49NU7105 - Smart TV de 49" 4K UHD HDR (Pantalla Slim, Quad-Core, 3 HDMI, 2 USB), Color Negro (Carbon Black)',
        sku: null,
        category_id: '',
        related_search_queries: [],
        images: [Array] }]
    }
    comunicationCtrl.saveProduct(body.product)
    expect(spyCreate).to.be.called()
  })
})
