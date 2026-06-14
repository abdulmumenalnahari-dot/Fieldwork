// 1. الاستدعاء
const express = require('express');

// 2. الموجه
const router = express.Router();

// 3. استدعاء مدير الولاء والعضويات
const loyaltyController = require('../controllers/loyaltyController');

// 4. الروابط:
// نستخدم .post لإرسال طلب بترقية حساب مستخدم معين إلى VIP.
router.post('/upgrade-vip', loyaltyController.upgradeToVIP);

// 5. التصدير
module.exports = router;