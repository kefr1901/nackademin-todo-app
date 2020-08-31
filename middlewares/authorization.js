const jwt = require('jsonwebtoken')
const secret = "hemlig"



function auth(req,res,next){
    if(!req.headers.authorization) return res.sendStatus(403)
    const token = req.headers.authorization.replace("Bearer ", "")
    try{
        const payload = jwt.verify(token, process.env.SECRET)
        req.user = payload
        console.log(payload);
        next()
    }catch(e){
        res.sendStatus(403)
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


module.exports = {auth, admin, user};