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


describe('test RESTful resource listrouter & listcontroller', () => {
    beforeEach(async function()  {
        await listModel.clear();
        await userModel.clear()
            const user = {
                username :"philip",
                password : "ydehed",
                groups:["admin"]
            }
            const usercopy = {...user}
            const result = await userModel.insertUser(user)
            //console.log("USER PASSWORD:" + user.password);
            //console.log(result)
             let loginToken = await userModel.login(user.username , usercopy.password )
            
             //console.log("får tillnaka användare" + result._id);
            this.currentTest.token = loginToken.token
            this.currentTest.userId = result._id
            //console.log(loginToken)
        
    });
    
    it('should test to create a todolist with a title',  function ()  {
       // console.log(this.test.userId);
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
            title : "Lägger till en ny lista",
            listId : "rrpgXrkQEIjhweiW"
        }
        const result = await listModel.insertToDB(list)
        //console.log(result);
        //console.log(result.userId);

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
        title: "New list before GET list",
        userId: this.test.userId
    }
    const result = await listModel.insertToDB(list)
    request(app)
    .get(`/lists/${result._id}`)
    .set('Authorization', `Bearer ${this.test.token}`)
    .send()  
    .end((err, res) => {
        expect(res).to.be
        expect(res).to.be.a("object")
        expect(res).to.have.status(200)
        expect(res).to.be.json
     })
  
})

it('should update a specific list', async function ()  {
    //create a new list 
    const list = {
        title: "New list",
        userId: this.test.userId
    }
    const result = await listModel.insertToDB(list)

    const body = {
            title: "New title on the new list",
            userId: this.test.userId
        }
    
    request(app)
    .get(`/lists/${result._id}`)
    .set('Authorization', `Bearer ${this.test.token}`)
    .send(body)  
    .end((err, res) => {
        expect(res).to.be
        expect(res).to.be.a("object")
        expect(res).to.have.status(200)
        expect(res).to.be.json
     
        //expect(res).to.have.keys(['title', '_id'])
     })
  
})

it('should delete a specific list', async function ()  {
    //create a new list 
    const list = {
        title: "Nya lista",
        userId: this.test.userId
    }
    const result = await listModel.insertToDB(list)
    request(app)
    .get(`/lists/${result._id}`)
    .set('Authorization', `Bearer ${this.test.token}`)
    .send()  
    .end((err, res) => {
        expect(res).to.be
        expect(res).to.be.a("object")
        expect(res).to.have.status(200)
        expect(res).to.be.json
    
     })
  
})



