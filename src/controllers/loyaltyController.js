const db = require('../config/db');

// ترقية المستخدم إلى VIP
exports.upgradeToVIP = async (req, res) => {
    const { core_user_id } = req.body;
    try {
        await db.execute(`UPDATE user_profiles SET is_vip = TRUE WHERE core_user_id = ?`, [core_user_id]);
        
        await db.execute(`INSERT INTO audit_logs (core_user_id, action, details) VALUES (?, ?, ?)`, [core_user_id, 'ترقية حساب', `تمت ترقية الحساب إلى مستوى VIP`]);

        res.status(200).json({ status: "نجاح", message: "تمت ترقية الحساب إلى VIP. ستتمتع بشحن مجاني من الآن فصاعداً!" });
    } catch (error) {
        res.status(500).json({ status: "خطأ", message: "تعذر ترقية الحساب." });
    }
};

// يتم استدعاء هذه الدالة آلياً بعد إتمام أي طلب ناجح (تم ربطها منطقياً هنا للتوضيح)
exports.addLoyaltyPoints = async (core_user_id, order_total_amount) => {
    // كل 100 ريال/عملة تعطي نقطة واحدة
    const points_earned = Math.floor(order_total_amount / 100);
    await db.execute(`UPDATE user_profiles SET loyalty_points = loyalty_points + ? WHERE core_user_id = ?`, [points_earned, core_user_id]);
};