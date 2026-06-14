const express = require('express');
const router = express.Router();
const walletController = require('../controllers/walletController');
router.post('/charge', walletController.chargeWallet);
router.get('/:user_id', walletController.getBalance);
module.exports = router;