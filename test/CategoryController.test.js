'use strict'

const chai = require('chai')
const expect = require('chai').expect
const db = require('../db/db')
const spies = require('chai-spies')
const categoryCtrl = require('../controllers/CategoryController')
const Category = require('../models/Category')
let { validate } = require('../services/validationService')

/** mock callback method */
let callback = (nulled, data) => {
  return data
}

chai.use(spies)

let context, createSpy, getOneSpy, getAllSpy, updateSpy, callbackSpy, validateSpy, spy, toCreate, event

beforeEach(() => {
  toCreate = {
    name: 'category',
    description: 'description'
  }

  context = {
    callbackWaitsForEmptyEventLoop: true
  }

  event = {
    pathParameters: {
      id: 'jk12321jhk32h1j'
    },
    body: toCreate
  }
  validateSpy = chai.spy(validateSpy)
  validateSpy = validateSpy

  spy = chai.spy(db.connectToDatabase)
  db.connectToDatabase = spy

  callbackSpy = chai.spy(callback)
  callback = callbackSpy

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
  it.only('creating new element with proper element ', () => {
    let res = categoryCtrl.create(event, context, callback)
    expect(res).to.be.true
    // expect(context.callbackWaitsForEmptyEventLoop).to.be.false
    expect(spy).to.be.called()
    /* expect(callback).to.be.called()
    expect(createSpy).to.be.called()
    expect(validateSpy).not.be.called() */
    /** this make us wait for the solved promise */
    // expect(context.callbackWaitsForEmptyEventLoop).to.be.false
    /* expect(spy).to.be.called()
    expect(callback).to.be.called()
    expect(createSpy).to.be.called()
    expect(validateSpy).not.be.called()**/
  })

  it('creating new element with no proper element ', () => {
    let res = categoryCtrl.create(event, context, callback)
    expect(res).to.be.true
    /** this make us wait for the solved promise */
    /* expect(spy).to.be.called()
    expect(callback).to.be.called()
    expect(createSpy).to.be.called()
    expect(validateSpy).not.be.called() */
  })
})

describe('[categoryController.getOne]', () => {
  it('getting an element ', () => {
    categoryCtrl.getOne(event, context, callback)
    /** this make us wait for the solved promise */
    setTimeout(function () {
      expect(spy).to.be.called()
      expect(callback).to.be.called()
      expect(getOneSpy).to.be.called()
      expect(context.callbackWaitsForEmptyEventLoop).to.be.false
    }, 3000)
  })
})

describe('[categoryController.getAll]', () => {
  it('getting an element ', () => {
    categoryCtrl.getAll(event, context, callback)
    /** this make us wait for the solved promise */
    setTimeout(function () {
      expect(spy).to.be.called()
      expect(callback).to.be.called()
      expect(getAllSpy).to.be.called()
      expect(context.callbackWaitsForEmptyEventLoop).to.be.false
    }, 3000)
  })
})

describe('[categoryController.update]', () => {
  it('updating an element ', () => {
    categoryCtrl.update(event, context, callback)
    /** this make us wait for the solved promise */
    setTimeout(function () {
      expect(spy).to.be.called()
      expect(callback).to.be.called()
      expect(updateSpy).to.be.called()
      expect(context.callbackWaitsForEmptyEventLoop).to.be.false
    }, 3000)
  })
})
