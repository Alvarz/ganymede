// 'use strict'
/*
const chai = require('chai')
const mongoose = require('mongoose')
const expect = require('chai').expect
const db = require('../db/db')
const spies = require('chai-spies')

chai.use(spies)
let spy

before(() => {
  spy = chai.spy(mongoose.connect)
  mongoose.connect = spy
})

describe('[DB] methods to connect with the db', () => {
  it('test db new connection', (done) => {
    expect(db.isConnected).to.be.false
    db.connectToDatabase()
      .then(() => {
        mongoose.connection.close(done)
        expect(db.isConnected).to.be.true
        expect(spy).to.be.called()
      })
      .catch(err => {
        expect(err).not.be.null
        expect(db.isConnected).to.be.false
      })
  })

  it(' test using current conn', (done) => {
    db.isConnected = true

    db.connectToDatabase()
      .then(() => {
        mongoose.connection.close(done)
        expect(db.isConnected).to.be.true
        expect(spy).to.not.be.called()
      })
      .catch(err => {
        expect(err).not.be.null
        expect(db.isConnected).to.be.false
      })
  })
}) */
