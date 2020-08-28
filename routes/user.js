//LOGIKEN 
const userRouter = require('express').Router();
const userController = require('../controllers/userController')



//get all
userRouter.get('/', async (req, res) => {
    userController.findUsers(req,res)
})
//get one
userRouter.get('/:id', async (req, res) => {
    userController.findUser(req,res)
})
//create one
userRouter.post('/create', async (req, res) => {
    userController.createUser(req,res)
})

//update one
userRouter.patch('/update/:id', async (req, res) => {
    userController.updateUser(req,res) 
})

//delete one
userRouter.delete('/delete/:id', async (req, res) => {
    userController.deleteUser(req, res)  
})


module.exports = userRouter; 
