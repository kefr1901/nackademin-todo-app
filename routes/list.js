//LOGIKEN 
const listRouter = require('express').Router();
const listController = require('../controllers/listController')
const auth = require('../middlewares/authorization')


//get all list
listRouter.get('/', async (req, res) => {
    listController.findLists(req,res)
})
//get one
listRouter.get('/:id', async (req, res) => {
   listController.findList(req,res)
})
//create one
listRouter.post('/', auth.auth, (req, res) => {
    
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
