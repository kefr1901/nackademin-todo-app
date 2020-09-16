const app = require('./app.js')


app.listen(process.env.PORT||3001, () => {
    console.log('Example app listening at http://localhost:3001')
})