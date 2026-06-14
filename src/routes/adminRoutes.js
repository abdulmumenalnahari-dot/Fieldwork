// 1. الاستدعاء
const express = require('express');

// 2. الموجه
const router = express.Router();

// 3. استدعاء مدير النظام والإحصائيات
const adminController = require('../controllers/adminController');

// 4. الروابط:
// نستخدم .get لأن لوحة التحكم تطلب "عرض" بيانات وإحصائيات المبيعات.
// الرابط سيكون: /dashboard
router.get('/dashboard', adminController.getDashboardStats);

// 5. التصدير
module.exports = router;