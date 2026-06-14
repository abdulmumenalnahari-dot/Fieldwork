// 1. استدعاء مكتبة إكسبريس
const express = require('express');

// 2. إنشاء موجه الروابط
const router = express.Router();

// 3. استدعاء ملف الـ Controller الخاص بالـ PDF الذي برمجناه سابقاً
const pdfController = require('../controllers/pdfController');

// 4. إنشاء الرابط: 
// نستخدم .get لأننا نريد "جلب/تحميل" الفاتورة.
// الرابط سيكون: /generate/:tracking_number (الرقم يتغير حسب الفاتورة)
// عندما يزور المستخدم هذا الرابط، سيتم تشغيل دالة generateInvoice
router.get('/generate/:tracking_number', pdfController.generateInvoice);

// 5. تصدير الملف ليقرأه السيرفر الرئيسي
module.exports = router;