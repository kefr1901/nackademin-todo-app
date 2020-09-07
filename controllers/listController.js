//LOGIKEN 
const express = require('express')
const router = express.Router()
const listModel = require("../models/listModel");

router.get("/", (req, res) => {
    res.render("./index")
})

async function findList(req, res){
    const id = req.params.id;
    console.log(req.user.groups);
    const todos = await listModel.findList(id)
    res.json({todos})
}

async function findLists(req, res){
    const todos = await listModel.findLists()
    console.log(todos);
    res.json(todos)
}

async function createList(req, res){
    var toDo = { title: req.body.title, done: req.body.done , user: req.user.userId ,};
    await listModel.insertToDB(toDo)
    res.json({toDo});
}

async function updateList(req, res){
    const updateToDo = await listModel.updateList(req.params.id, req.body.title , req.body.done)
    res.json(updateToDo + " Todo uppdaterad");
}

async function deleteTodo(req, res){
    const deleteToDo = await listModel.deleteList(req.params.id)
    res.json(deleteToDo);
    
}


module.exports = {createList, findList, findLists, deleteTodo, updateList} 
