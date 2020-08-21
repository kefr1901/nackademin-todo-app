const dataStore = require('nedb');
const express = require('express')

let postCollection = new dataStore({ filename: './post.db', autoload: true });


function insertToDB(toDo) {
    return new Promise((resolve, reject) => {
        postCollection.insert(toDo, (err, newDoc) => {
            resolve(newDoc)
        });
    })
}

function findToDo() {
    return new Promise((resolve, reject) => {
        postCollection.find({}, function (err, docs) {
            resolve(docs)
        });
    })
}

function updateToDo(id, title, done) {
    return new Promise((resolve, reject) => {
    //postCollection.find({ _id: id }, (err, docs) => {
        //console.log(id, title, done)
            postCollection.update({ _id: id }, { title: title, done:done}, (err, updateDoc) => {
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


module.exports = { insertToDB, findToDo, updateToDo, deleteToDo}
