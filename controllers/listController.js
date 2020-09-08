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
    const list = await listModel.findList()
    console.log(list);
    res.status(200).json(lists)
   
}





module.exports = {createList, findLists, findList} 
