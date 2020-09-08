
const Datastore = require('nedb-promises');
const express = require('express')

let listCollection

if (process.env.ENVIRONMENT === "development") {
    listCollection = new Datastore({ filename: './database/development/list.db', autoload: true });

} else {
    listCollection = new Datastore({ filename: './database/test/list.db', autoload: true });
}


async function insertToDB(title, userId) {
    let test = {
        title: title,
        userId: userId
    }
    //console.log(test.userId)
    console.log("kommer in i insert")
    const result = await listCollection.insert({test })
    //console.log(result)

    console.log("efter insert")
    return result;

}



async function findLists() {

    const result = await listCollection.find({});
    console.log(result)
    return result;

}

async function findList(id) {

    const result = await listCollection.find({ _id: id })
    console.log(result)
    return result;
}

/*
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
*/

async function clear() {

    const doc = await listCollection.remove({}, { multi: true });
};
function count() {
    return new Promise((resolve, reject) => {
        listCollection.count({}, function (err, docs) {
            console.log(docs)
            resolve(docs)
        });
    })
}



module.exports = { insertToDB, clear, count, findLists, findList }
