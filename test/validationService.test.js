'use strict'

const chai = require('chai')
const expect = require('chai').expect
const spies = require('chai-spies')
const validationService = require('../services/validationService')
const axios = require('axios')

chai.use(spies)
let spy

/** mock method */
let callback = (nulled, data) => {
  return data
}
/** statuses array to be tested */
let statusses, err

beforeEach(() => {
  spy = chai.spy(callback)
  callback = spy

  statusses = ['processing', 'fulfilled', 'failed']

  err = {
    errors: {
      name: {
        message: 'Validator "String is empty" failed for path name',
        name: 'ValidatorError',
        path: 'name',
        type: 'String is empty'
      },
      phone: {
        message: 'Validator "String is empty" failed for path name',
        name: 'ValidatorError',
        path: 'name',
        type: 'String is empty' } }
  }
})

describe('[validationService.validateSearchUpdate] test related to this service', () => {
  it('validate correct statusses', () => {
    for (let st of statusses) {
      validationService.validateSearchUpdate(st, callback)
      expect(spy).not.be.called()
    }
  })

  it('validate wrong statusses', () => {
    validationService.validateSearchUpdate('done', callback)
    expect(spy).be.called()
  })
})

describe('[validationService.validate] test the sheme validation errors', () => {
  it('has valid errors', () => {
    validationService.validate(err, callback)
    expect(spy).be.called()
  })

  it('has no valid errors', () => {
    validationService.validate({}, callback)
    expect(spy).be.called()
  })
})
