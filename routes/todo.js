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
todoRouter.post('/create', auth, async (req, res) => {
    todoController.createTodo(req,res)
})

//update one
todoRouter.patch('/update/:id', auth, async (req, res) => {
    todoController.createTodo(req,res) 
})

//delete one
todoRouter.delete('/delete/:id', auth, async (req, res) => {
   todoController.deleteTodo(req, res)  
})


module.exports = todoRouter; 
