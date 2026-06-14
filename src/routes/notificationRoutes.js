// 1. الاستدعاء
const express = require('express');

// 2. الموجه
const router = express.Router();

// 3. استدعاء مدير الإشعارات
const notificationController = require('../controllers/notificationController');

// 4. الروابط:
// إرسال إشعار لحظي (Push Notification) لهاتف المستخدم.
router.post('/push', notificationController.sendPushNotification);

// إرسال إيميلات تذكيرية لكل شخص لديه منتجات متروكة في السلة.
router.post('/remind-carts', notificationController.remindAbandonedCarts);

// 5. التصدير
module.exports = router;