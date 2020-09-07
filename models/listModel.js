const dataStore = require('nedb');
const express = require('express')

let listCollection

if(process.env.ENVIRONMENT === "development"){
   listCollection = new dataStore({ filename: './database/development/list.db', autoload: true });

}else{
    postCollection = new dataStore({ filename: './database/test/post.db', autoload: true });
}


function insertToDB(toDo) {
    return new Promise((resolve, reject) => {
        listCollection.insert(toDo, (err, newDoc) => {
            resolve(newDoc)
        });
    })
}

function findList(id) {
    return new Promise((resolve, reject) => {
        listCollection.find({_id: id}, function (err, docs) {
            resolve(docs)
        });
    })
}

function findLists() {
    return new Promise((resolve, reject) => {
        listCollection.find({}, function (err, docs) {
            resolve(docs)
        });
    })
}

function updateList(id, title, done, groups ) {
    return new Promise((resolve, reject) => {
            listCollection.update({ _id: id }, { title: title, done:done , groups: groups }, (err, updateDoc) => {
                resolve(updateDoc)
            });
       // });
    });

}

function deleteList(id){
    return new Promise((resolve, reject) => {
    //postCollection.find({ _id: id }, (err, docs) => {
        listCollection.remove({ _id: id }, {}, (err, toDoRemoved) => {
            resolve(toDoRemoved + " Todo has been removed!");
        });
   // });
});
}


function clear(){
    return new Promise((resolve, reject) => {
    listCollection.remove({ }, { multi: true }, function (err, numRemoved) {
        resolve()
      });
});
}

function count() {
    return new Promise((resolve, reject) => {
        listCollection.count({}, function (err, docs) {
            console.log(docs)
            resolve(docs)
        });
    })
}



module.exports = { insertToDB, findList, findLists, updateList, deleteList, clear, count}
