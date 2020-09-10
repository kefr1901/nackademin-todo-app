//LOGIKEN 
const express = require('express')
const router = express.Router()
const listModel = require("../models/listModel");

async function createList(req, res){
    try{
        let title = req.body.title;
        let userId = req.user.userId;
        let result = await listModel.insertToDB(title, userId)
        console.log(result)
        res.status(200).json(result);
        

    }catch(error){
        console.log(error)
        res.sendStatus(400)
    }

}

async function findLists(req, res){
    const lists = await listModel.findLists()
    console.log(lists);
    res.status(200).json(lists)
   
}


async function findList(req, res){
    let listId = req.params.id
    console.log(listId)
    const list = await listModel.findList(listId)
    console.log(list);
    res.status(200).json(list)
   
}

async function updateList(req, res){
    let title = req.body.title
    let listId = req.body.listId
    const updatelist = await listModel.updateList(title ,listId)
    res.status(200).json(updateList)

}

async function deleteList(req, res){
    const deleteList = await todoModel.deleteToDo(req.params.id)
    res.status(200).json(deleteList);
    
}



module.exports = {createList, findLists, findList, updateList, deleteList} 
