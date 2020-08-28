//LOGIKEN 
const express = require('express')
const router = express.Router()
const userModel = require("../models/userModel");

router.get("/", (req, res) => {
    res.render("./index")
})

async function findUser(req, res){
    const id = req.params.id;
    const user = await userModel.findUser(id)
    res.json({user})
}

async function findUsers(req, res){
    const users = await userModel.findUsers()
    console.log(users);
    res.json(users)
}

async function createUser(req, res){
    var user = { username: req.body.username, password: req.body.password, role: req.body.role};

    await userModel.insertUser(user)
    res.json({user});
    //res.render("./index")
}

async function updateUser(req, res){
    const updateUser = await userModel.updateUser(req.params.id, req.body.username , req.body.password)
    res.json(updateUser + "User uppdaterad");
}

async function deleteUser(req, res){
    const deleteUser = await userModel.deleteUser(req.params.id)
    res.json(deleteUser);
    
}


module.exports = {createUser, findUsers, findUser, deleteUser, updateUser} 
