const dataStore = require('nedb');
const express = require('express')

let postCollection

if(process.env.ENVIRONMENT === "development"){
   postCollection = new dataStore({ filename: './database/development/post.db', autoload: true });

}else{
    postCollection = new dataStore({ filename: './database/test/post.db', autoload: true });
}


function insertToDB(toDo) {
    return new Promise((resolve, reject) => {
        postCollection.insert(toDo, (err, newDoc) => {
            resolve(newDoc)
        });
    })
}

function findToDo(id) {
    return new Promise((resolve, reject) => {
        postCollection.find({_id: id}, function (err, docs) {
            resolve(docs)
        });
    })
}

function findToDoByUser(id) {
    return new Promise((resolve, reject) => {
        postCollection.find({user: id}, function (err, docs) {
            resolve(docs)
        });
    })
}

function findToDos() {
    return new Promise((resolve, reject) => {
        postCollection.find({}, function (err, docs) {
            resolve(docs)
        });
    })
}

function updateToDo(id, title, done, groups ) {
    return new Promise((resolve, reject) => {
            postCollection.update({ _id: id }, { title: title, done:done , groups: groups }, (err, updateDoc) => {
                resolve(updateDoc)
            });
       // });
    });

}

function deleteToDo(id){
    return new Promise((resolve, reject) => {
    //postCollection.find({ _id: id }, (err, docs) => {
        postCollection.remove({ _id: id }, {}, (err, toDoRemoved) => {
            resolve(toDoRemoved + " Todo has been removed!");
        });
   // });
});
}

function deleteUserTodos(id){
    return new Promise((resolve, reject) => {
    //postCollection.find({ _id: id }, (err, docs) => {
        postCollection.remove({ user: id }, {}, (err, toDoRemoved) => {
            resolve(toDoRemoved + " Todo has been removed!");
        });
   // });
});
}


function clear(){
    return new Promise((resolve, reject) => {
    postCollection.remove({ }, { multi: true }, function (err, numRemoved) {
        resolve()
      });
});
}

function count() {
    return new Promise((resolve, reject) => {
        postCollection.count({}, function (err, docs) {
            console.log(docs)
            resolve(docs)
        });
    })
}




module.exports = { insertToDB, findToDo, findToDos, updateToDo, deleteToDo, clear, count, deleteUserTodos, findToDoByUser}
