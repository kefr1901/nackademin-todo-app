const chai = require('chai')
//const { expect } = require('chai');
const todoModel = require('../models/todoModel')
chai.should();

describe('count all todos', () => {
    beforeEach(async () => {
        await todoModel.clear();
    });
    it('should count all todos', async () => {
        await todoModel.insertToDB({ title: "Testing a new todo", dode: true })
        const result = await todoModel.count()
        result.should.be.a('number')
        result.should.equal(1)
        result.should.not.equal(6)
    })
})