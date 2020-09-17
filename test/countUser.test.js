const chai = require('chai')
const Database = require('../database')
const User = require('../models/userModel')
chai.should();

describe('count all users', () => {
    before( async () => {
        await Database.connect()
    })

    beforeEach(async () => {
        await User.clear();
    });
    it('should count all users', async () => {
        await User.insertUser({ username: "kevin", password: "kevin123", groups: 'admin'})
        const result = await User.count()
        result.should.be.a('number')
        result.should.equal(1)
        result.should.not.equal(6)
    })
})