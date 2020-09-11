//LOGIKEN 
const express = require('express')
const router = express.Router()
const listModel = require("../models/listModel");
const userModel = require("../models/userModel");
const todoModel = require("../models/todoModel");
const path = require("path")

async function getPolicy(req, res) {
    //skicka tillbaka en fil med policy
    res.sendFile(path.resolve(__dirname +'/../public/policy.txt'));
  

}

async function getGdprInfo(req, res) {
    //skicka tillbaka informationen som finns med det användarID
    console.log("kommer in i gdpr controller GET")

    let userId = req.user.userId;

    console.log(userId)

    const list = await listModel.findListByUser(userId)
    const user = await userModel.findUser(userId)
    const posts = await todoModel.findToDoByUser(userId)

    console.log(list, user, posts)

    res.status(200).json({ list, user, posts })

}


    async function deleteGdprInfo(req, res) {
        //ta bort information med det användarID't
        console.log("kommer in i gdpr controller DELETE")
        let userId = req.user.userId

        console.log(userId)
      
            const lists = await listModel.deleteUserList(userId)
            const user = await userModel.deleteUser(userId)
            const posts = await todoModel.deleteUserTodos(userId)


            console.log(lists);
            console.log(user)
            console.log(posts)
            res.status(200).json({lists, user, posts})

    }



module.exports = { getPolicy, getGdprInfo, deleteGdprInfo} 
