'use strict'

const chai = require('chai')
const expect = require('chai').expect
const spies = require('chai-spies')
const handler = require('../handler')
const SearchOrderCtrl = require('../controllers/SearchOrderController')
const ProductCtrl = require('../controllers/ProductController')
const CategoryCtrl = require('../controllers/CategoryController')
const ComunicationCtrl = require('../controllers/ComunicationController')

chai.use(spies)

let context = {
  callbackWaitsForEmptyEventLoop: true
}

/** runs before all tests in this block */
before(() => {
  /** SearchOrder */
  /**  mock the controller functions with boolean value */
  SearchOrderCtrl.create = (event, context, callback) => {
    return true
  }

  /**  mock the controller functions with boolean value */
  SearchOrderCtrl.getOne = (event, context, callback) => {
    return true
  }

  /**  mock the controller functions with boolean value */
  SearchOrderCtrl.getAll = (event, context, callback) => {
    return true
  }

  /**  mock the controller functions with boolean value */
  SearchOrderCtrl.update = (event, context, callback) => {
    return true
  }

  /** Product */
  /**  mock the controller functions with boolean value */
  ProductCtrl.create = (event, context, callback) => {
    return true
  }

  /**  mock the controller functions with boolean value */
  ProductCtrl.getOne = (event, context, callback) => {
    return true
  }

  /**  mock the controller functions with boolean value */
  ProductCtrl.getAll = (event, context, callback) => {
    return true
  }

  /**  mock the controller functions with boolean value */
  ProductCtrl.update = (event, context, callback) => {
    return true
  }

  /** Category */
  /**  mock the controller functions with boolean value */
  CategoryCtrl.create = (event, context, callback) => {
    return true
  }

  /**  mock the controller functions with boolean value */
  CategoryCtrl.getOne = (event, context, callback) => {
    return true
  }

  /**  mock the controller functions with boolean value */
  CategoryCtrl.getAll = (event, context, callback) => {
    return true
  }

  /**  mock the controller functions with boolean value */
  CategoryCtrl.update = (event, context, callback) => {
    return true
  }

  /** Comunication */
  /**  mock the controller functions with boolean value */
  ComunicationCtrl.callback = (event, context, callback) => {
    return true
  }
})

/** runs before each test in this block */
beforeEach(() => {
  context.callbackWaitsForEmptyEventLoop = true
})

describe('[handler.SearchOrder] Search Order related functions', () => {
  it('to be called create', () => {
    /** set the spy on the method */
    let spy = chai.spy(SearchOrderCtrl.create)
    SearchOrderCtrl.create = spy
    handler.createSearchOrder({}, context, {})
    expect(SearchOrderCtrl.create).to.have.been.called()
    expect(SearchOrderCtrl.create).to.be.spy
    expect(context.callbackWaitsForEmptyEventLoop).to.be.false
  })

  it('to be called getOne', () => {
    /** set the spy on the method */
    let spy = chai.spy(SearchOrderCtrl.getOne)
    SearchOrderCtrl.getOne = spy
    handler.getOneSearchOrder({}, context, {})
    expect(SearchOrderCtrl.getOne).to.have.been.called()
    expect(SearchOrderCtrl.getOne).to.be.spy
    expect(context.callbackWaitsForEmptyEventLoop).to.be.false
  })

  it('to be called getAllSearchOrder', () => {
    /** set the spy on the method */
    let spy = chai.spy(SearchOrderCtrl.getAll)
    SearchOrderCtrl.getAll = spy
    handler.getAllSearchOrder({}, context, {})
    expect(SearchOrderCtrl.getAll).to.have.been.called()
    expect(SearchOrderCtrl.getAll).to.be.spy
    expect(context.callbackWaitsForEmptyEventLoop).to.be.false
  })

  it('to be called update', () => {
    /** set the spy on the method */
    let spy = chai.spy(SearchOrderCtrl.update)
    SearchOrderCtrl.update = spy
    handler.updateSearchOrder({}, context, {})
    expect(SearchOrderCtrl.update).to.have.been.called()
    expect(SearchOrderCtrl.update).to.be.spy
    expect(context.callbackWaitsForEmptyEventLoop).to.be.false
  })
})

describe('[handler.Product] Product related functions', () => {
  it('to be called create', () => {
    /** set the spy on the method */
    let spy = chai.spy(ProductCtrl.create)
    ProductCtrl.create = spy
    handler.createProduct({}, context, {})
    expect(ProductCtrl.create).to.have.been.called()
    expect(ProductCtrl.create).to.be.spy
    expect(context.callbackWaitsForEmptyEventLoop).to.be.false
  })

  it('to be called getOne', () => {
    /** set the spy on the method */
    let spy = chai.spy(ProductCtrl.getOne)
    ProductCtrl.getOne = spy
    handler.getOneProduct({}, context, {})
    expect(ProductCtrl.getOne).to.have.been.called()
    expect(ProductCtrl.getOne).to.be.spy
    expect(context.callbackWaitsForEmptyEventLoop).to.be.false
  })

  it('to be called getAll', () => {
    /** set the spy on the method */
    let spy = chai.spy(ProductCtrl.getAll)
    ProductCtrl.getAll = spy
    handler.getAllProduct({}, context, {})
    expect(ProductCtrl.getAll).to.have.been.called()
    expect(ProductCtrl.getAll).to.be.spy
    expect(context.callbackWaitsForEmptyEventLoop).to.be.false
  })

  it('to be called update', () => {
    /** set the spy on the method */
    let spy = chai.spy(ProductCtrl.update)
    ProductCtrl.update = spy
    handler.updateProduct({}, context, {})
    expect(ProductCtrl.update).to.have.been.called()
    expect(ProductCtrl.update).to.be.spy
    expect(context.callbackWaitsForEmptyEventLoop).to.be.false
  })
})

describe('[handler.Category] category related functions', () => {
  it('to be called create', () => {
    /** set the spy on the method */
    let spy = chai.spy(CategoryCtrl.create)
    CategoryCtrl.create = spy
    handler.createCategory({}, context, {})
    expect(CategoryCtrl.create).to.have.been.called()
    expect(CategoryCtrl.create).to.be.spy
    expect(context.callbackWaitsForEmptyEventLoop).to.be.false
  })

  it('to be called getOne', () => {
    /** set the spy on the method */
    let spy = chai.spy(CategoryCtrl.getOne)
    CategoryCtrl.getOne = spy
    handler.getOneCategory({}, context, {})
    expect(CategoryCtrl.getOne).to.have.been.called()
    expect(CategoryCtrl.getOne).to.be.spy
    expect(context.callbackWaitsForEmptyEventLoop).to.be.false
  })

  it('to be called getAll', () => {
    /** set the spy on the method */
    let spy = chai.spy(CategoryCtrl.getAll)
    CategoryCtrl.getAll = spy
    handler.getAllCategory({}, context, {})
    expect(CategoryCtrl.getAll).to.have.been.called()
    expect(CategoryCtrl.getAll).to.be.spy
    expect(context.callbackWaitsForEmptyEventLoop).to.be.false
  })

  it('to be called update', () => {
    /** set the spy on the method */
    let spy = chai.spy(CategoryCtrl.update)
    CategoryCtrl.update = spy
    handler.updateCategory({}, context, {})
    expect(CategoryCtrl.update).to.have.been.called()
    expect(CategoryCtrl.update).to.be.spy
    expect(context.callbackWaitsForEmptyEventLoop).to.be.false
  })
})

describe('[handler.Comunication] category related functions', () => {
  it('to be called callback', () => {
    /** set the spy on the method */
    let spy = chai.spy(ComunicationCtrl.callback)
    ComunicationCtrl.callback = spy
    handler.callback({}, context, {})
    expect(ComunicationCtrl.callback).to.have.been.called()
    expect(ComunicationCtrl.callback).to.be.spy
    expect(context.callbackWaitsForEmptyEventLoop).to.be.false
  })
})
