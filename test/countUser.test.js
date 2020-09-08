/*const chai = require('chai')
//const { expect } = require('chai');
const countModel = require('../models/userModel')
chai.should();

describe('count all users', () => {
    beforeEach(async () => {
        await countModel.clear();
    });
    it('should count all users', async () => {
        await countModel.insertUser({ username: "kevin", password: "kevin123", groups: ['user', 'admin'] })
        const result = await countModel.count()
        result.should.be.a('number')
        result.should.equal(1)
        result.should.not.equal(6)
    })
})*/