'use strict'

const expect = require('chai').expect
const Product = require('../models/Product')

describe('[models.Product] test Product Schema model', () => {
  describe('schema empty', () => {
    it('should have validation errors', () => {
      let m = new Product()
      m.validate((err) => {
        expect(err.errors.name).to.exist
        expect(err.errors.price).to.not.exist
        expect(err.errors.category_id).to.not.exist
      })
    })
  })

  describe('schema full', () => {
    it('should have validation errors', () => {
      let m = new Product({
        'name': 'televisor',
        'price': '1.0000',
        'original_price': '2.000',
        'category_id': '',
        'description': '',
        'link': '',
        'images': ['link1', 'link2', 'link3'],
        'related_search_queries': ['link1', 'link2', 'link3']

      })
      m.validate((err) => {
        expect(err).to.not.exist
      })
    })
  })
})
