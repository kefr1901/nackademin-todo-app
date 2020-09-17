const Database = require('../database')
const chai = require('chai')
//const { expect } = require('chai');
const Todo = require('../models/todoModel')
chai.should();

describe('count all todos', () => {
    before( async () => {
        await Database.connect()
    })
    beforeEach(async () => {
        await Todo.clear();
    });
    it('should count all todos', async () => {
        await Todo.insertToDB({ title: "Testing a new todo :P", dode: true })
        const result = await Todo.count()
        result.should.be.a('number')
        result.should.equal(1)
        result.should.not.equal(6)
        
    })
})