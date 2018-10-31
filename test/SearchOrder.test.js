'use strict'

const expect = require('chai').expect
const SearchOrder = require('../models/SearchOrder')

describe('[models.SearchOrder] test SearchProduct schema model', () => {
  describe('Test if it the arrays have the properly length and values', () => {
    it('statusses should have proper values', () => {
      expect(SearchOrder.statusses).to.have.lengthOf(3)
      expect(SearchOrder.statusses).to.have.members(['processing', 'fulfilled', 'failed'])
    })

    it('updateable should have proper values', () => {
      expect(SearchOrder.updateable).to.have.lengthOf(2)
      expect(SearchOrder.updateable).to.have.members(['status', 'products'])
    })

    it('providers should have proper values', () => {
      expect(SearchOrder.providers).to.have.lengthOf(3)
      expect(SearchOrder.providers).to.have.members(['easy', 'mercado_libre', 'amazon'])
    })
  })

  describe('schema empty', () => {
    it('should have validation errors', () => {
      let m = new SearchOrder()
      m.validate((err) => {
        expect(err.errors.query).to.exist
        expect(err.errors.provider).to.exist
        expect(err.errors.options).to.not.exist
      })
    })
  })

  describe('schema full', () => {
    it('should have validation errors', () => {
      let m = new SearchOrder({
        'query': 'television',
        'provider': 'easy',
        'options': {
          'user': 'theuser',
          'password': 'thepassword'

        },
        'callbackUrl': 'http://my-endpoint.com/results'
      })
      m.validate((err) => {
        expect(err).to.not.exist
      })
    })
  })
})
