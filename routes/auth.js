const authRouter = require('express').Router();
const authController = require('../controllers/authController');

authRouter.post('/login', async (req, res) => {
    authController.login(req, res);
})


module.exports = authRouter; 