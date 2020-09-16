//const Datastore = require('nedb');
const express = require('express')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
/*
let userCollection

if(process.env.ENVIRONMENT === "development"){
    userCollection = new Datastore({ filename: './database/development/user.db', autoload: true });

}else{
    userCollection = new Datastore({ filename: './database/test/user.db', autoload: true });
}*/



const userSchema = new mongoose.Schema({
    email: {type: String, unique: true },
    passwordDigest: String,
    posts: Array
})


const User = mongoose.model('User', userSchema)

function insertUser(newUser) {
    
        return new Promise(async(resolve, reject) => {
            if(await checkUserNameExist(newUser.username)){
                reject("User already exist");
            }
             newUser.password = bcrypt.hashSync(newUser.password, 10)
             User.insert(newUser, (err, newDoc) => {
                 resolve(newDoc)
             });
         })
}

function findUsers() {
    return new Promise((resolve, reject) => {
        User.find({}, function (err, docs) {
            resolve(docs)
        });
    })
}

function findUser(id) {
    return new Promise((resolve, reject) => {
        User.find({_id:id}, function (err, docs) {
            resolve(docs)
        });
    })
}

function updateUser(id, username, password) {
    return new Promise((resolve, reject) => {
        User.update({ _id: id }, { username: username, password:password}, (err, updateDoc) => {
                resolve(updateDoc)
            });
    });
}


function deleteUser(id){
    return new Promise((resolve, reject) => {
        console.log(id)
        User.remove({ _id: id }, {}, (err, userRemoved) => {
            resolve(userRemoved + " user has been removed!");
        });
});
}

function authUser(username, password) {

    console.log("kommer in i authUser")
    return new Promise((resolve, reject) => {
        User.findOne({username: username }, function (err, docs)  {
            if(docs == null){
                return reject('No user found')
            }
            if(!bcrypt.compareSync(password,docs.password)){
                //console.log(password, docs.password)
                return reject('Invalid password, try again')
            }

            resolve(docs)
            //console.log(docs)
        });
    })
}


function checkUserNameExist(username) {
    return new Promise((resolve, reject) => {
        User.find({ "username": username}, function (err, docs) {
          if(docs.length>0){
            resolve(true)
          }
          else{
              resolve(false)
          }
        });
    })
}

function count() {
    return new Promise((resolve, reject) => {
        User.count({}, function (err, docs) {
            console.log(docs)
            resolve(docs)
        });
    })
}


function clear(){
    return new Promise((resolve, reject) => {
        User.remove({ }, { multi: true }, function (err, numRemoved) {
        resolve()
      });
});
}

async function login(username, password) {
    try{
        console.log("TESTING password: " + password)
        const result = await authUser(username, password)
        
        const payload = {userId:result._id, username:result.username , groups: result.groups}
        console.log(payload);
   
        const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '7d' })
       // console.log(token )
        //res.json({token});
        return {token};
      
        
  }catch(error){
       // res.status(400).json(error)
       return {message: error}
  }

    
}




module.exports = { insertUser, findUser, findUsers, updateUser, deleteUser , authUser, checkUserNameExist, clear, count, login}
