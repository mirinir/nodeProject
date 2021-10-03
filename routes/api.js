const router = require('express').Router();
const getController = require('../controller/getController')

// --------get functions
router.get('/getAllClients',getController.getAllClients)
router.get('/getInvestmentPoolmName',getController.getInvestmentPoolmName)
router.get('/getStoresNames',getController.getStoresNames)

module.exports = router;
