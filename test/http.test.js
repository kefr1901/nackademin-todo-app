const app = require('../app.js')
const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const {expect, request} = chai
const userModel = require('../models/userModel')
const loginRouter = require('../routes/auth')
const { json } = require('express')


describe('try create a user and login', () => {
    beforeEach(async function()  {
        await userModel.clear();
        //create a new user
            const user = {
                username :"philip",
                password : "ydehed",
                groups:["admin"]
            }

            const usercopy = {...user}
            //console.log(user.password)
            const result = await userModel.insertUser(user)

       // console.log("RESULT" + JSON.stringify(result))
        //console.log(result.username)
       // this.currentTest.userID = result._id
        //console.log("USER PASSWORD:" + user.password);
        //console.log("result PASSWORD:" + result.password)
    
        let token = await userModel.login(user.username , usercopy.password )
        console.log(token.token)
    });
    it('should create a new person with token', async function ()  {
        //console.log(this.test.token);
       // console.log(this.test.userID)
      
    })
})


/*
const userModel = require('../models/userModel');
const chai = require('chai');
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const { expect, request, should } = chai
const app = require('../app.js')

describe('Integation test on login and register', () => {
        this.currentTest = {}
        beforeEach(async () => {
            await userModel.clear()
            this.currentTest.user = await userModel.postUserModel({
                username: "yde",
                password: "root",
                role: 'User',
                _id: '2'
            })
             console.log(this.currentTest.user);

            // this.currentTest.userID = user.id
            // this.currentTest.token =
            //     await User.authenticate("yde", "root")
        })
        it('Should create a user', () => { //how to test a hashed password?
            // console.log(this.currentTest.user);
            // let fields = this.currentTest.user
            // request(app)
            // post('/user')
            // set('Authorization', Bearer ${this.test.token})
            //     .set('Content-Type', application/json)
            //     .send(fields)
            //     .end((err, res) => {
            //         expect(res).to.have.status(201)
            //         expect(res).to.be.json
            //         expect(res.body).to.have.keys(['fields'])
            //     })

        })
    })
*/