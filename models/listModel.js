
//const Datastore = require('nedb-promises');
const express = require('express')
const mongoose = require('mongoose')

/*let listCollection

if (process.env.ENVIRONMENT === "development") {
    listCollection = new Datastore({ filename: './database/development/list.db', autoload: true });

} else {
    listCollection = new Datastore({ filename: './database/test/list.db', autoload: true });
}*/
const listSchema = new mongoose.Schema({
    email: {type: String, unique: true },
    passwordDigest: String,
    posts: Array
})

const List = mongoose.model('List', listSchema)

//create list with 
async function insertToDB(title, userId) {
    let test = {
        title: title,
        userId: userId
    }
    const result = await List.insert({test })
    return result;
}


async function findLists() {
    const result = await List.find({});
    console.log(result)
    return result;

}

async function findList(id) {
    const result = await List.findOne({ _id: id })
    console.log(result)
    return result;
}

async function findListByUser(id) {
    const result = await List.findOne({ "test.userId": id })
    console.log(result)
    return result;
}


function updateList(id, title, listId ) {
  
           const result =  List.update({ _id: id }, {title: title, listId: listId}) 
                console.log(result)
                return result;

}

function deleteList(id){

       const result =  List.remove({ _id: id })
       console.log(result)
       return result;
}

function deleteUserList(id){
    const result = List.remove({"test.userId": id})
    console.log(result)
    return result;
}



async function clear() {

    const doc = await List.remove({}, { multi: true });
};
function count() {
    return new Promise((resolve, reject) => {
        List.count({}, function (err, docs) {
            console.log(docs)
            resolve(docs)
        });
    })
}



module.exports = { insertToDB, clear, count, findLists, findList, updateList, deleteList, deleteUserList, findListByUser }
