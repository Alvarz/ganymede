const chai = require('chai')
const expect = require('chai').expect
const spies = require('chai-spies')
const handler = require('../handler')
const SearchOrderCtrl = require('../controllers/SearchOrderController')

chai.use(spies)

describe('[handler] test the main entry', () => {
  let context = {
    callbackWaitsForEmptyEventLoop: true
  }

  /** runs before all tests in this block */
  before(() => {
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
  })

  /** runs before each test in this block */
  beforeEach(() => {
    context.callbackWaitsForEmptyEventLoop = true
  })

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
