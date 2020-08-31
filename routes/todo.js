//LOGIKEN 
const todoRouter = require('express').Router();
const todoController = require('../controllers/todoController')
const auth = require('../middlewares/authorization')


//get all
todoRouter.get('/', async (req, res) => {
    todoController.findTodos(req,res)
})
//get one
todoRouter.get('/:id', async (req, res) => {
    todoController.findTodo(req,res)
})
//create one
todoRouter.post('/create', auth.auth, async (req, res) => {
    todoController.createTodo(req,res)
})

//update one
todoRouter.patch('/update/:id', auth.auth, auth.user, async (req, res) => {
    todoController.updateTodo(req,res) 
})

//delete one
todoRouter.delete('/delete/:id', auth.auth, auth.admin,  async (req, res) => {
   todoController.deleteTodo(req, res)  
})


module.exports = todoRouter; 
