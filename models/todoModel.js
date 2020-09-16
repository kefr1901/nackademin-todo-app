//const dataStore = require('nedb');
const express = require('express')
const mongoose = require('mongoose')

/*let postCollection

if(process.env.ENVIRONMENT === "development"){
   postCollection = new dataStore({ filename: './database/development/post.db', autoload: true });

}else{
    postCollection = new dataStore({ filename: './database/test/post.db', autoload: true });
}*/

const todoSchema = new mongoose.Schema({
    email: {type: String, unique: true },
    passwordDigest: String,
    posts: Array
})

const Todo = mongoose.model('Todo', todoSchema)

function insertToDB(toDo) {
    return new Promise((resolve, reject) => {
        Todo.insert(toDo, (err, newDoc) => {
            resolve(newDoc)
        });
    })
}

function findToDo(id) {
    return new Promise((resolve, reject) => {
        Todo.find({_id: id}, function (err, docs) {
            resolve(docs)
        });
    })
}

function findToDoByUser(id) {
    return new Promise((resolve, reject) => {
        Todo.find({user: id}, function (err, docs) {
            resolve(docs)
        });
    })
}

function findToDos() {
    return new Promise((resolve, reject) => {
        Todo.find({}, function (err, docs) {
            resolve(docs)
        });
    })
}

function updateToDo(id, title, done, groups ) {
    return new Promise((resolve, reject) => {
        Todo.update({ _id: id }, { title: title, done:done , groups: groups }, (err, updateDoc) => {
                resolve(updateDoc)
            });
       // });
    });

}

function deleteToDo(id){
    return new Promise((resolve, reject) => {
    //postCollection.find({ _id: id }, (err, docs) => {
        Todo.remove({ _id: id }, {}, (err, toDoRemoved) => {
            resolve(toDoRemoved + " Todo has been removed!");
        });
   // });
});
}

function deleteUserTodos(id){
    return new Promise((resolve, reject) => {
    //postCollection.find({ _id: id }, (err, docs) => {
        Todo.remove({ user: id }, {}, (err, toDoRemoved) => {
            resolve(toDoRemoved + " Todo has been removed!");
        });
   // });
});
}


function clear(){
    return new Promise((resolve, reject) => {
        Todo.remove({ }, { multi: true }, function (err, numRemoved) {
        resolve()
      });
});
}

function count() {
    return new Promise((resolve, reject) => {
        Todo.count({}, function (err, docs) {
            console.log(docs)
            resolve(docs)
        });
    })
}




module.exports = { insertToDB, findToDo, findToDos, updateToDo, deleteToDo, clear, count, deleteUserTodos, findToDoByUser}
