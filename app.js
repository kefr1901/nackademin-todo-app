require('dotenv').config()
const express = require('express')
const todoRouter = require('./routes/todo')
const userRouter = require('./routes/user')
const authRouter = require('./routes/auth')
const listRouter = require('./routes/list')
const gdprRouter = require('./routes/gdpr')
const cors = require('cors')

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json());

//app.use(cors())

//app.set('view engine', 'ejs')
app.use('/todos',todoRouter); 
app.use('/user',userRouter);
app.use('/auth', authRouter);
app.use('/lists', listRouter);
app.use('/gdpr', gdprRouter);

app.use(express.static(__dirname + '/public'));

app.get("/", (req, res) => {
    res.sendFile("index.html" , {root:__dirname})
});

module.exports= app
