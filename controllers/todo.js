//LOGIKEN 
const express = require('express')
const router = express.Router()
const modelsDB = require("../models/model");
/*
router.get("/", (req, res) => {
    res.render("./index")
})
*/

//Läsa alla toDo's 

router.get('/', async (req, res) => {
    const todos = await modelsDB.findToDo()
    res.send(todos)
})

router.post('/create', async (req, res) => {
    var toDo= { title: req.body.title, done: req.body.done,};
    await modelsDB.insertToDB(toDo)
    res.send(toDo);
    //res.render("./index")
})


//UPPDATERAR BEFINTLIGA INLÄGG
router.put('/update/:id', async (req, res) => {
    const updateToDo = await modelsDB.updateToDo(req.params.id, req.body.title , req.body.done)
    res.json(updateToDo + " Todo uppdaterad");
})

//TAR BORT TODO
router.delete('/delete/:id', async (req, res) => {
    const deleteToDo = await modelsDB.deleteToDo(req.params.id)
    res.json(deleteToDo);
    
})


module.exports = router; 
