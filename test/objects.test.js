const assert = require('assert')
const expect = require('chai').expect
const should = require('chai').should()
const { cleanObject } = require('../utils/objects')

/** object base to be cleaned */
let obj = {
  'name': 'john',
  'lastname': 'doe',
  'email': 'john@example.com',
  'phone': '23123131231'
}

/** this is how obj var should be after be cleaned */
let final = {
  'name': 'john',
  'lastname': 'doe',
  'phone': '23123131231'
}

/** comparer array */
let comparer = ['name', 'lastname', 'phone']

describe('[utils.objects] Test if it clean the object', () => {
  it('should return a cleaned object', () => {
    let resp = cleanObject(obj, comparer)
    expect(resp).to.eql(final)
    expect(resp).to.not.have.key('email')
  })
})
