const jwt = require('jsonwebtoken')
const secret = "hemlig"



function auth(req,res,next){
    if(!req.headers.authorization) return res.sendStatus(403)
    const token = req.headers.authorization.replace("Bearer ", "")
    try{
        const payload = jwt.verify(token, process.env.SECRET)
        req.user = payload
        next()
    }catch(e){
        res.sendStatus(403)
    }
}

module.exports = auth;