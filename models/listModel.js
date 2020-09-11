
const Datastore = require('nedb-promises');
const express = require('express')

let listCollection

if (process.env.ENVIRONMENT === "development") {
    listCollection = new Datastore({ filename: './database/development/list.db', autoload: true });

} else {
    listCollection = new Datastore({ filename: './database/test/list.db', autoload: true });
}

//create list with 
async function insertToDB(title, userId) {
    let test = {
        title: title,
        userId: userId
    }
    const result = await listCollection.insert({test })
    return result;
}


async function findLists() {
    const result = await listCollection.find({});
    console.log(result)
    return result;

}

async function findList(id) {
    const result = await listCollection.findOne({ _id: id })
    console.log(result)
    return result;
}

async function findListByUser(id) {
    const result = await listCollection.findOne({ "test.userId": id })
    console.log(result)
    return result;
}


function updateList(id, title, listId ) {
  
           const result =  listCollection.update({ _id: id }, {title: title, listId: listId}) 
                console.log(result)
                return result;

}

function deleteList(id){

       const result =  listCollection.remove({ _id: id })
       console.log(result)
       return result;
}

function deleteUserList(id){
    const result = listCollection.remove({"test.userId": id})
    console.log(result)
    return result;
}



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



module.exports = { insertToDB, clear, count, findLists, findList, updateList, deleteList, deleteUserList, findListByUser }
