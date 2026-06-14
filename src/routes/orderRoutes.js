const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// مسار إتمام الطلب والدفع (الموجود مسبقاً)
router.post('/checkout', orderController.checkout);

// الرابط الجديد لعرض الفاتورة وتفاصيلها باستخدام رقم التتبع
router.get('/:tracking_number', orderController.getOrderDetails); 

module.exports = router;