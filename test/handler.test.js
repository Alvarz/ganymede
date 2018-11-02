'use strict'

const chai = require('chai')
const expect = require('chai').expect
const spies = require('chai-spies')
const handler = require('../handler')
const SearchOrderCtrl = require('../controllers/SearchOrderController')
const ProductCtrl = require('../controllers/ProductController')
const CategoryCtrl = require('../controllers/CategoryController')
const AppCtrl = require('../controllers/AppController')
const ComunicationCtrl = require('../controllers/ComunicationController')

chai.use(spies)

let context = {
  callbackWaitsForEmptyEventLoop: true
}

// act as themisto
let event = {
  headers: {
    Authorization: 'Bearer a157a344-a20f-e2fe-f5ac-1cd2dc1ac3db'
  },
  body: JSON.stringify({ name: 'test' })
}

/** runs before all tests in this block */
before(() => {
  /** SearchOrder */
  /**  mock the controller functions with boolean value */
  SearchOrderCtrl.create = (event, context) => {
    return true
  }

  /**  mock the controller functions with boolean value */
  SearchOrderCtrl.getOne = (event, context) => {
    return true
  }

  /**  mock the controller functions with boolean value */
  SearchOrderCtrl.getAll = (event, context) => {
    return true
  }

  /**  mock the controller functions with boolean value */
  SearchOrderCtrl.update = (event, context) => {
    return true
  }

  /** Product */
  /**  mock the controller functions with boolean value */
  ProductCtrl.create = (event, context) => {
    return true
  }

  /**  mock the controller functions with boolean value */
  ProductCtrl.getOne = (event, context) => {
    return true
  }

  /**  mock the controller functions with boolean value */
  ProductCtrl.getAll = (event, context) => {
    return true
  }

  /**  mock the controller functions with boolean value */
  ProductCtrl.update = (event, context) => {
    return true
  }

  /** Category */
  /**  mock the controller functions with boolean value */
  CategoryCtrl.create = (event, context) => {
    return true
  }

  /**  mock the controller functions with boolean value */
  CategoryCtrl.getOne = (event, context) => {
    return true
  }

  /**  mock the controller functions with boolean value */
  CategoryCtrl.getAll = (event, context) => {
    return true
  }

  /**  mock the controller functions with boolean value */
  CategoryCtrl.update = (event, context) => {
    return true
  }

  /** Comunication */
  /**  mock the controller functions with boolean value */
  ComunicationCtrl.callback = (event, context) => {
    return true
  }

  /** App */
  /**  mock the controller functions with boolean value */
  AppCtrl.create = (event, context) => {
    return true
  }

  /**  mock the controller functions with boolean value */
  AppCtrl.getOne = (event, context) => {
    return true
  }

  /**  mock the controller functions with boolean value */
  AppCtrl.getAll = (event, context) => {
    return true
  }

  /**  mock the controller functions with boolean value */
  AppCtrl.update = (event, context) => {
    return true
  }

  /**  mock the controller functions with boolean value */
  AppCtrl.auth = async (event, context) => {
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
    let spyAuth = chai.spy(AppCtrl.auth)
    AppCtrl.auth = spyAuth
    handler.createSearchOrder(event, context, {})
    expect(spyAuth).not.have.been.called()
    expect(SearchOrderCtrl.create).to.be.spy
  })

  it('to be called getOne', () => {
    /** set the spy on the method */
    let spy = chai.spy(SearchOrderCtrl.getOne)
    SearchOrderCtrl.getOne = spy
    let spyAuth = chai.spy(AppCtrl.auth)
    AppCtrl.auth = spyAuth
    handler.getOneSearchOrder(event, context, {})
    expect(spyAuth).not.have.been.called()
    expect(SearchOrderCtrl.getOne).to.be.spy
    expect(context.callbackWaitsForEmptyEventLoop).to.be.false
  })

  it('to be called getAllSearchOrder', () => {
    /** set the spy on the method */
    let spy = chai.spy(SearchOrderCtrl.getAll)
    SearchOrderCtrl.getAll = spy
    let spyAuth = chai.spy(AppCtrl.auth)
    AppCtrl.auth = spyAuth
    handler.getAllSearchOrder(event, context, {})
    expect(spyAuth).not.have.been.called()
    expect(SearchOrderCtrl.getAll).to.be.spy
    expect(context.callbackWaitsForEmptyEventLoop).to.be.false
  })

  it('to be called update', () => {
    /** set the spy on the method */
    let spy = chai.spy(SearchOrderCtrl.update)
    SearchOrderCtrl.update = spy
    let spyAuth = chai.spy(AppCtrl.auth)
    AppCtrl.auth = spyAuth
    handler.updateSearchOrder(event, context, {})
    expect(spyAuth).to.have.been.called()
    expect(SearchOrderCtrl.update).to.be.spy
    expect(context.callbackWaitsForEmptyEventLoop).to.be.false
  })
})

describe('[handler.Product] Product related functions', () => {
  it('to be called create', () => {
    /** set the spy on the method */
    let spy = chai.spy(ProductCtrl.create)
    ProductCtrl.create = spy
    let spyAuth = chai.spy(AppCtrl.auth)
    AppCtrl.auth = spyAuth
    handler.createProduct(event, context, {})
    expect(spyAuth).to.have.been.called()
    expect(ProductCtrl.create).to.be.spy
    expect(context.callbackWaitsForEmptyEventLoop).to.be.false
  })

  it('to be called getOne', () => {
    /** set the spy on the method */
    let spy = chai.spy(ProductCtrl.getOne)
    ProductCtrl.getOne = spy
    let spyAuth = chai.spy(AppCtrl.auth)
    AppCtrl.auth = spyAuth
    handler.getOneProduct(event, context, {})
    expect(spyAuth).to.have.been.called()
    expect(ProductCtrl.getOne).to.be.spy
    expect(context.callbackWaitsForEmptyEventLoop).to.be.false
  })

  it('to be called getAll', () => {
    /** set the spy on the method */
    let spy = chai.spy(ProductCtrl.getAll)
    ProductCtrl.getAll = spy
    let spyAuth = chai.spy(AppCtrl.auth)
    AppCtrl.auth = spyAuth
    handler.getAllProduct(event, context, {})
    expect(spyAuth).to.have.been.called()
    expect(ProductCtrl.getAll).to.be.spy
    expect(context.callbackWaitsForEmptyEventLoop).to.be.false
  })

  it('to be called update', () => {
    /** set the spy on the method */
    let spy = chai.spy(ProductCtrl.update)
    ProductCtrl.update = spy
    let spyAuth = chai.spy(AppCtrl.auth)
    AppCtrl.auth = spyAuth
    handler.updateProduct(event, context, {})
    expect(spyAuth).to.have.been.called()
    expect(ProductCtrl.update).to.be.spy
    expect(context.callbackWaitsForEmptyEventLoop).to.be.false
  })
})

describe('[handler.Category] category related functions', () => {
  it('to be called create', () => {
    /** set the spy on the method */
    let spy = chai.spy(CategoryCtrl.create)
    CategoryCtrl.create = spy
    let spyAuth = chai.spy(AppCtrl.auth)
    AppCtrl.auth = spyAuth
    handler.createCategory(event, context, {})
    expect(spyAuth).to.have.been.called()
    expect(CategoryCtrl.create).to.be.spy
    expect(context.callbackWaitsForEmptyEventLoop).to.be.false
  })

  it('to be called getOne', () => {
    /** set the spy on the method */
    let spy = chai.spy(CategoryCtrl.getOne)
    CategoryCtrl.getOne = spy
    let spyAuth = chai.spy(AppCtrl.auth)
    AppCtrl.auth = spyAuth
    handler.getOneCategory(event, context, {})
    expect(spyAuth).to.have.been.called()
    expect(CategoryCtrl.getOne).to.be.spy
    expect(context.callbackWaitsForEmptyEventLoop).to.be.false
  })

  it('to be called getAll', () => {
    /** set the spy on the method */
    let spy = chai.spy(CategoryCtrl.getAll)
    CategoryCtrl.getAll = spy
    let spyAuth = chai.spy(AppCtrl.auth)
    AppCtrl.auth = spyAuth
    handler.getAllCategory(event, context, {})
    expect(spyAuth).to.have.been.called()
    expect(CategoryCtrl.getAll).to.be.spy
    expect(context.callbackWaitsForEmptyEventLoop).to.be.false
  })

  it('to be called update', () => {
    /** set the spy on the method */
    let spy = chai.spy(CategoryCtrl.update)
    CategoryCtrl.update = spy
    let spyAuth = chai.spy(AppCtrl.auth)
    AppCtrl.auth = spyAuth
    handler.updateCategory(event, context, {})
    expect(spyAuth).to.have.been.called()
    expect(CategoryCtrl.update).to.be.spy
    expect(context.callbackWaitsForEmptyEventLoop).to.be.false
  })
})

describe('[handler.Comunication] category related functions', () => {
  it('to be called callback', () => {
    /** set the spy on the method */
    let spy = chai.spy(ComunicationCtrl.callback)
    ComunicationCtrl.callback = spy
    let spyAuth = chai.spy(AppCtrl.auth)
    AppCtrl.auth = spyAuth
    handler.callback(event, context, {})
    expect(spyAuth).to.have.been.called()
    expect(ComunicationCtrl.callback).to.be.spy
    expect(context.callbackWaitsForEmptyEventLoop).to.be.false
  })
})

describe('[handler.App] category related functions', () => {
  it('to be called create', () => {
    /** set the spy on the method */
    let spy = chai.spy(AppCtrl.create)
    AppCtrl.create = spy

    let spyAuth = chai.spy(AppCtrl.auth)
    AppCtrl.auth = spyAuth

    handler.createApp(event, context, {})
    expect(spyAuth).to.have.been.called()
    expect(AppCtrl.create).to.be.spy
    expect(context.callbackWaitsForEmptyEventLoop).to.be.false
  })

  it('to be called getOne', () => {
    /** set the spy on the method */
    let spy = chai.spy(AppCtrl.getOne)
    AppCtrl.getOne = spy

    let spyAuth = chai.spy(AppCtrl.auth)
    AppCtrl.auth = spyAuth
    handler.getOneApp(event, context, {})
    expect(spyAuth).to.have.been.called()
    expect(AppCtrl.getOne).to.be.spy
    expect(context.callbackWaitsForEmptyEventLoop).to.be.false
  })

  it('to be called getAll', () => {
    /** set the spy on the method */
    let spy = chai.spy(AppCtrl.getAll)
    AppCtrl.getAll = spy
    let spyAuth = chai.spy(AppCtrl.auth)
    AppCtrl.auth = spyAuth
    handler.getAllApp(event, context, {})
    expect(spyAuth).to.have.been.called()
    expect(AppCtrl.getAll).to.be.spy
    expect(context.callbackWaitsForEmptyEventLoop).to.be.false
  })

  it('to be called update', () => {
    /** set the spy on the method */
    let spy = chai.spy(AppCtrl.update)
    AppCtrl.update = spy
    let spyAuth = chai.spy(AppCtrl.auth)
    AppCtrl.auth = spyAuth
    handler.updateApp(event, context, {})
    expect(spyAuth).to.have.been.called()
    expect(AppCtrl.update).to.be.spy
    expect(context.callbackWaitsForEmptyEventLoop).to.be.false
  })
})
