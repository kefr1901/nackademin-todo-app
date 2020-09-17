const app = require('./app.js')
const Database = require('./database')



Database.connect().then( () => 
    app.listen( process.env.PORT || 5000, () => console.log("It's running birch"))
)


app.listen(process.env.PORT||3001, () => {
    console.log('Example app listening at http://localhost:3001')
})