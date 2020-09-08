/*const chai = require('chai')
//const { expect } = require('chai');
const listModel = require('../models/listModel')
chai.should();

describe('count all todos', () => {
    beforeEach(async () => {
        await listModel.clear();
    });
    it('should count all todos', async () => {
        await listModel.insertToDB({ title: "Testing a new tlist"})
      const result = await listModel.count()
        result.should.be.a('number')
        result.should.equal(1)
        result.should.not.equal(6)
    })
})*/