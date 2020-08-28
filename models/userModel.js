const dataStore = require('nedb');
const express = require('express')

let userCollection = new dataStore({ filename: './user.db', autoload: true });


function insertUser(toDo) {
    return new Promise((resolve, reject) => {
        userCollection.insert(toDo, (err, newDoc) => {
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
    //postCollection.find({ _id: id }, (err, docs) => {
        //console.log(id, title, done)
        userCollection.update({ _id: id }, { username: username, password:password}, (err, updateDoc) => {
                resolve(updateDoc)
            });
       // });
    });

}


function deleteUser(id){
    return new Promise((resolve, reject) => {
    //postCollection.find({ _id: id }, (err, docs) => {
        userCollection.remove({ _id: id }, {}, (err, userRemoved) => {
            resolve(userRemoved + " user has been removed!");
        });
   // });
});
}


module.exports = { insertUser, findUser, findUsers, updateUser, deleteUser}
