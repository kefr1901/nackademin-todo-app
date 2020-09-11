const gdprRouter = require('express').Router();
const gdprController = require('../controllers/gdprController');
const auth = require('../middlewares/authorization')

gdprRouter.get('/gdprpolicy', async (req, res) => {
    gdprController.getPolicy(req, res);
})

gdprRouter.get('/getinfo', auth.auth, async (req, res) => {
    gdprController.getGdprInfo(req, res);
})

gdprRouter.delete('/delete', auth.auth ,async (req, res) => {
    gdprController.deleteGdprInfo(req, res);
})



module.exports = gdprRouter; 