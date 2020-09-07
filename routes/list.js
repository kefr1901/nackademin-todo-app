//LOGIKEN 
const listRouter = require('express').Router();
const listController = require('../controllers/listController')
const auth = require('../middlewares/authorization')


//get all
listRouter.get('/', async (req, res) => {
    listController.findList(req,res)
})
//get one
listRouter.get('/:id', async (req, res) => {
    listController.findLists(req,res)
})
//create one
listRouter.post('/create', auth.auth, async (req, res) => {
    listController.createList(req,res)
})

//update one
listRouter.patch('/update/:id', auth.auth, auth.user, async (req, res) => {
    listController.updateList(req,res) 
})

//delete one
listRouter.delete('/delete/:id', auth.auth, auth.admin,  async (req, res) => {
    listController.deleteList(req, res)  
})


module.exports = listRouter; 
