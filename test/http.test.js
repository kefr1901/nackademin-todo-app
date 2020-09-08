const app = require('../app.js')
const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const {expect, request} = chai
const userModel = require('../models/userModel')
const listModel = require('../models/listModel')
const loginRouter = require('../routes/auth')
const { json } = require('express')
const { post } = require('../app.js')


describe('test RESTful resource todorouter & todocontroller', () => {
    beforeEach(async function()  {
        await listModel.clear();
        await userModel.clear()
        //create a new user
            const user = {
                username :"philip",
                password : "ydehed",
                groups:["admin"]
            }

            const usercopy = {...user}
            const result = await userModel.insertUser(user)
            //console.log("USER PASSWORD:" + user.password);
            //console.log("result PASSWORD:" + result.password)
             let loginToken = await userModel.login(user.username , usercopy.password )
            // console.log(token.token)
            this.currentTest.token = loginToken.token
            console.log(loginToken)
        
    });
    
    it('should test to create a todolist with a title',  function ()  {
        let body = {
            title: "TESTLISTA"
        }
        request(app)
        .post('/lists')
        .set('Authorization', `Bearer ${this.test.token}`)
        .send(body)  
        .end((err, res) => {
            console.log(res.body)
            expect(res).to.have.status(200)
            expect(res).to.be.json
           // expect(res.body).to.have.keys(['title', 'userId', '_id'])
         })
      
    })
    it('should get all lists', async function ()  {
        const list = {
            title : "hej ny lista",
            postId : "rrpgXrkQEIjhweiW"
        }
        const result = await listModel.insertToDB(list)
        console.log(result);

        request(app)
        .get('/lists')
        .set('Authorization', `Bearer ${this.test.token}`)
        .send()  
        .end((err, res) => {
            expect(res).to.be.a("object")
            expect(res).to.have.status(200)
            expect(res).to.be.json
         })
      
    })
})
it('should get a specific list', async function ()  {
    //create a new list 
    const list = {
        title: "Nya lista",
        
    }
    //insert the list
    const result = await listModel.insertToDB(list)
    
    console.log(result);

    const body = {
        _id: "odcVQe7NJkRHqmWO"
    }
    request(app)
    .get('/lists/:id')
    .set('Authorization', `Bearer ${this.test.token}`)
    .send(body)  
    .end((err, res) => {
        expect(res).to.be.a("object")
        expect(res).to.have.status(200)
        expect(res).to.be.json
        //expect(res).to.have.keys(['title', '_id'])
     })
  
})

