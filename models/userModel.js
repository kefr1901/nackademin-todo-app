const dataStore = require('nedb');
const express = require('express')
const bcrypt = require('bcryptjs');

let userCollection = new dataStore({ filename: './user.db', autoload: true });


function insertUser(user) {
    
        return new Promise(async(resolve, reject) => {
            if(await checkUserNameExist(user.username)){
                reject("User already exist");
            }
             user.password = bcrypt.hashSync(user.password, 10)
             userCollection.insert(user, (err, newDoc) => {
                 resolve(newDoc)
             });
         })
}

function findUsers() {
    return new Promise((resolve, reject) => {
        userCollection.find({}, function (err, docs) {
            resolve(docs)
        });
    })
}

function findUser(id) {
    return new Promise((resolve, reject) => {
        userCollection.find({_id:id}, function (err, docs) {
            resolve(docs)
        });
    })
}

function updateUser(id, username, password) {
    return new Promise((resolve, reject) => {
        userCollection.update({ _id: id }, { username: username, password:password}, (err, updateDoc) => {
                resolve(updateDoc)
            });
    });
}


function deleteUser(id){
    return new Promise((resolve, reject) => {
        userCollection.remove({ _id: id }, {}, (err, userRemoved) => {
            resolve(userRemoved + " user has been removed!");
        });
});
}

function authUser(username, password) {
    console.log("kommer in i authUser")
    return new Promise((resolve, reject) => {
        userCollection.findOne({username: username }, function (err, docs)  {
            if(docs == null){
                return reject('No user found')
            }
            if(!bcrypt.compareSync(password,docs.password)){
                return reject('Invalid password, try again')
            }

            resolve(docs)
            console.log(docs)
        });
    })
}

function checkUserNameExist(username) {
    return new Promise((resolve, reject) => {
        userCollection.find({ "username": username}, function (err, docs) {
          if(docs.length>0){
            resolve(true)
          }
          else{
              resolve(false)
          }
        });
    })
}


module.exports = { insertUser, findUser, findUsers, updateUser, deleteUser , authUser, checkUserNameExist}
