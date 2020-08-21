const express = require('express')
const todoController = require('./controllers/todo')

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.set('view engine', 'ejs')
app.use('/todos',todoController); 

app.listen(3000, () => {
    console.log('lyssnar på: http://localhost:3000')
})