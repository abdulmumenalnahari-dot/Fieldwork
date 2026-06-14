// 1. استدعاء مكتبة إكسبريس
const express = require('express');

// 2. إنشاء الموجه
const router = express.Router();

// 3. جلب أوامر الدفع من الكنترولر الخاص بها
const paymentController = require('../controllers/paymentController');

// 4. الروابط:
// نستخدم .post لأننا نرسل بيانات حساسة (رقم البطاقة أو طلب المرتجع).
// الرابط الأول (/card): مخصص للدفع عبر البطاقة الائتمانية الوهمية.
router.post('/card', paymentController.processCardPayment);

// الرابط الثاني (/refund): مخصص لإلغاء الطلب واسترداد الأموال.
router.post('/refund', paymentController.refundOrder);

// 5. التصدير
module.exports = router;