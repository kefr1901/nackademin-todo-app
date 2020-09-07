const jwt = require('jsonwebtoken')
const userModel = require('../models/userModel')



async function login(req, res) {
    try{
        var username = req.body.username;
        var password = req.body.password;
        const result = await userModel.authUser(username, password)
        const payload = {userId:result._id, username:result.username , groups: result.groups}
        console.log(payload);
        const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '7d' })
       // console.log(token)
        res.json(token);
      
        
  }catch(error){
        res.status(400).json(error)
  }

    
}

function user(req, res, next) {
        
    console.log('Groups: ', req.user.groups)
    if (req.user.groups == 'admin' || req.user.groups == 'user') {
        next()
    } else {
        console.log("Your are not an Admin or A User.")
        return res.sendStatus(403)
    }
}
function admin(req, res, next) {
    console.log('Groups: ', req.user.groups)
    if(req.user.groups == 'admin'){
        next()
    } else {
        console.log('You are not an Admin')
        return res.sendStatus(403)

    }
}

module.exports = {login, admin, user}