'use strict'

const expect = require('chai').expect
const Category = require('../models/Category')

describe('[models.Category] test Category Schema model', () => {
  describe('schema empty', () => {
    it('should have validation errors', () => {
      let m = new Category()
      m.validate((err) => {
        expect(err.errors.name).to.exist
        expect(err.errors.description).to.not.exist
      })
    })
  })

  describe('schema full', () => {
    it('should have validation errors', () => {
      let m = new Category({
        'name': 'televisor',
        'description': ''
      })
      m.validate((err) => {
        expect(err).to.not.exist
      })
    })
  })
})
