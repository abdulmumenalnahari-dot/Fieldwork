const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// إعدادات أساسية لعمل الـ API
app.use(cors()); // السماح بالاتصال الخارجي من تطبيقات أخرى مثل Flutter أو Postman
app.use(express.json()); // لكي يفهم السيرفر البيانات القادمة بصيغة JSON ويحللها
app.use('/uploads', express.static('uploads')); // جعل مجلد الصور متاحاً للقراءة عبر المتصفح أو التطبيق

// استدعاء قاعدة البيانات للتأكد من عملها عند التشغيل
const db = require('./src/config/db');

// مسار تجريبي (نقطة فحص) للتأكد من أن السيرفر يعمل ويستجيب
app.get('/', (req, res) => {
    res.json({ message: '🚀 Welcome to T-Fashion Extended API!' });
});

// =========================================================================
// --- قسم استدعاء وتفعيل الروابط (Routes) مع شرح تفصيلي لكل كلمة وسطر ---
// =========================================================================
// =========================================================================
// --- قسم استدعاء وتفعيل الروابط (Routes) مع شرح تفصيلي لكل كلمة وسطر ---
// =========================================================================
// =========================================================================
// --- قسم استدعاء وتفعيل الروابط (Routes) مع شرح تفصيلي لكل كلمة وسطر ---
// =========================================================================

// الجزء الأول: استدعاء الملفات (Importing)
// const: تعني "أنشئ متغيراً ثابتاً في الذاكرة لن يتم تغيير قيمته لاحقاً".
// require: هي دالة (وظيفة) أساسية في Node.js تخبر الخادم بـ "اذهب إلى هذا المسار واجلب الكود الموجود فيه".
// ('./src/routes/...'): هو المسار الدقيق للملف داخل مجلدات المشروع.

// --- الأنظمة الأساسية والمالية ---
const profileRoutes = require('./src/routes/profileRoutes');   // جلب أكواد نظام الملفات الشخصية وتخزينها في متغير اسمه profileRoutes
const cartRoutes = require('./src/routes/cartRoutes');         // جلب أكواد محرك السلة المتقدم وتخزينها في متغير اسمه cartRoutes
const orderRoutes = require('./src/routes/orderRoutes');       // جلب أكواد نظام الطلبات والفواتير وتخزينها في orderRoutes
const walletRoutes = require('./src/routes/walletRoutes');     // جلب أكواد نظام المحفظة الرقمية وتخزينها في walletRoutes
const promoRoutes = require('./src/routes/promoRoutes');       // جلب أكواد محرك العروض والكوبونات وتخزينها في promoRoutes
const reviewRoutes = require('./src/routes/reviewRoutes');     // جلب أكواد نظام التقييمات وتخزينها في reviewRoutes
const wishlistRoutes = require('./src/routes/wishlistRoutes'); // جلب أكواد نظام المفضلة وتخزينها في wishlistRoutes 

// --- الأنظمة المتقدمة (Enterprise Features) ---
const pdfRoutes = require('./src/routes/pdfRoutes');                   // جلب أكواد مولد الفواتير (PDF) وتخزينها في pdfRoutes
const paymentRoutes = require('./src/routes/paymentRoutes');           // جلب أكواد بوابات الدفع والمرتجعات وتخزينها في paymentRoutes
const notificationRoutes = require('./src/routes/notificationRoutes'); // جلب أكواد منظومة الإشعارات والإيميلات وتخزينها في notificationRoutes
const adminRoutes = require('./src/routes/adminRoutes');               // جلب أكواد لوحة تحكم الإدارة والإحصائيات وتخزينها في adminRoutes
const loyaltyRoutes = require('./src/routes/loyaltyRoutes');           // جلب أكواد نظام الولاء والعضويات المميزة وتخزينها في loyaltyRoutes


// الجزء الثاني: تفعيل الأنظمة وربطها بالروابط (Middleware Mounting)
// app.use: هو أمر برمجي يعني "يا خادم (app)، استخدم (use) هذه القاعدة لأي طلب قادم".
// ('/api/...'): هو "مفتاح الباب" أو الرابط الذي سيطلبه تطبيق Flutter.
// المتغير_الثاني: هو الملف الذي سيستلم الطلب ويقوم بالعملية (والذي قمنا بجلبه في الجزء الأول).

// 1. نظام الملفات الشخصية: إذا طلب التطبيق رابطاً يبدأ بـ "/api/profile"، قم بتحويله إلى ملف profileRoutes ليتعامل معه.
app.use('/api/profile', profileRoutes);      

// 2. محرك السلة: إذا طلب التطبيق رابطاً يبدأ بـ "/api/cart"، قم بتحويله إلى ملف cartRoutes ليضيف للسلة أو يقرأها.
app.use('/api/cart', cartRoutes);            

// 3. نظام الطلبات: إذا طلب التطبيق رابطاً يبدأ بـ "/api/orders"، قم بتحويله لملف orderRoutes لعملية الدفع وإصدار الفاتورة.
app.use('/api/orders', orderRoutes);         

// 4. المحفظة الرقمية: إذا طلب التطبيق رابطاً يبدأ بـ "/api/wallet"، قم بتحويله لملف walletRoutes لشحن الرصيد أو الاستعلام عنه.
app.use('/api/wallet', walletRoutes);        

// 5. محرك العروض: إذا طلب التطبيق رابطاً يبدأ بـ "/api/promotions"، قم بتحويله لملف promoRoutes للتحقق من الكوبونات.
app.use('/api/promotions', promoRoutes);     

// 6. نظام التقييمات: إذا طلب التطبيق رابطاً يبدأ بـ "/api/reviews"، قم بتحويله لملف reviewRoutes لإضافة نجمات المنتج.
app.use('/api/reviews', reviewRoutes);       

// 7. نظام المفضلة: إذا طلب التطبيق رابطاً يبدأ بـ "/api/wishlist"، قم بتحويله لملف wishlistRoutes لإضافة المنتجات للمفضلة أو إزالتها.
app.use('/api/wishlist', wishlistRoutes);    

// 8. مولد الفواتير (PDF): إذا طلب التطبيق رابطاً يبدأ بـ "/api/invoices"، قم بتحويله لملف pdfRoutes لتحميل الوثيقة.
app.use('/api/invoices', pdfRoutes);          

// 9. بوابات الدفع: إذا طلب التطبيق رابطاً يبدأ بـ "/api/payments"، قم بتحويله لملف paymentRoutes لمعالجة الدفع أو المرتجعات.
app.use('/api/payments', paymentRoutes);      

// 10. منظومة الإشعارات: إذا طلب التطبيق رابطاً يبدأ بـ "/api/notifications"، قم بتحويله لملف notificationRoutes لإرسال التنبيهات.
app.use('/api/notifications', notificationRoutes); 

// 11. لوحة الإدارة: إذا طلب التطبيق رابطاً يبدأ بـ "/api/admin"، قم بتحويله لملف adminRoutes لجلب الإحصائيات الرياضية للمبيعات.
app.use('/api/admin', adminRoutes);           

// 12. نظام الولاء: إذا طلب التطبيق رابطاً يبدأ بـ "/api/loyalty"، قم بتحويله لملف loyaltyRoutes لترقية الحسابات (VIP) أو إضافة النقاط.
app.use('/api/loyalty', loyaltyRoutes);       

// =========================================================================
// =========================================================================
// تشغيل الخادم
// process.env.PORT: قراءة رقم المنفذ من ملف .env المخفي، وإذا لم يجده (||) استخدم المنفذ 5000.
const PORT = process.env.PORT || 5000;

// app.listen: أمر يجعل الخادم يستمع للطلبات باستمرار دون توقف.
app.listen(PORT, () => {
    console.log(`🌟 Server is running on http://localhost:${PORT}`);
});