const mysql = require('mysql2');
require('dotenv').config();

// إصلاح الخطأ: تفكيك الرابط السحابي وإضافة خيارات الأمان المتقدمة لـ Aiven
const pool = mysql.createPool({
    // قراءة الرابط من المتغير السري فقط لمنع اعتراض GitHub
    uri: process.env.DATABASE_URL,
    
    ssl: {
        rejectUnauthorized: false
    },
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// تحويل الأوامر لدعم الـ Promises (لتسهيل كتابة الكود عبر async/await)
const db = pool.promise();

// اختبار الاتصال السحابي فور تشغيل السيرفر للتأكد من استقرار المتجر
pool.getConnection((err, connection) => {
    if (err) {
        console.error('❌ خطأ في الاتصال بقاعدة البيانات السحابية (Aiven):', err.message);
    } else {
        console.log('✅ تم الاتصال بقاعدة البيانات السحابية (Aiven MySQL) بنجاح وأمان!');
        connection.release();
    }
});

module.exports = db;