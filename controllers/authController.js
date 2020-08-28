const jwt = require('jsonwebtoken')
const userModel = require('../models/userModel')



async function login(req, res) {
    try{
        var username = req.body.username;
        var password = req.body.password;
        const result = await userModel.authUser(username, password)
        const payload = {userId:result._id, username:result.username , isAdmin: false}
        if( result.groups.includes('admin')){
            payload.isAdmin=true 
        }
        const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '7d' })
        console.log(token)
        res.json({token});
      
        
  }catch(error){
        res.status(400).json(error)
  }

    
}


module.exports = {login}