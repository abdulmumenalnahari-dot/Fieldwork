const express = require('express');
const router = express.Router();
const promoController = require('../controllers/promoController');
router.post('/validate', promoController.validateCoupon);
module.exports = router;