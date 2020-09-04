//LOGIKEN 
const express = require('express')
const router = express.Router()
const todoModel = require("../models/todoModel");

router.get("/", (req, res) => {
    res.render("./index")
})

async function findTodo(req, res){
    const id = req.params.id;
    console.log(req.user.groups);
    const todos = await todoModel.findToDo(id)
    res.json({todos})
}

async function findTodos(req, res){
    const todos = await todoModel.findToDos()
    console.log(todos);
    res.json(todos)
}

async function createTodo(req, res){
    var toDo = { title: req.body.title, done: req.body.done , user: req.user.userId ,};
    await todoModel.insertToDB(toDo)
    res.json({toDo});
}

async function updateTodo(req, res){
    const updateToDo = await todoModel.updateToDo(req.params.id, req.body.title , req.body.done)
    res.json(updateToDo + " Todo uppdaterad");
}

async function deleteTodo(req, res){
    const deleteToDo = await todoModel.deleteToDo(req.params.id)
    res.json(deleteToDo);
    
}


module.exports = {createTodo, findTodo, findTodos, deleteTodo, updateTodo} 
