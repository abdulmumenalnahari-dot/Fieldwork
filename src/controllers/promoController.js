const db = require('../config/db');

exports.validateCoupon = async (req, res) => {
    try {
        const { code } = req.body;
        const [rows] = await db.execute(`SELECT * FROM coupons WHERE code = ?`, [code]);

        if (rows.length === 0) {
            return res.status(404).json({ status: "خطأ", message: "الكوبون غير صحيح." });
        }

        const coupon = rows[0];
        const now = new Date();

        if (new Date(coupon.expires_at) < now) {
            return res.status(400).json({ status: "خطأ", message: "انتهت صلاحية هذا الكوبون." });
        }

        if (coupon.used_count >= coupon.max_uses) {
            return res.status(400).json({ status: "خطأ", message: "تم الوصول للحد الأقصى لاستخدام الكوبون." });
        }

        res.status(200).json({
            status: "نجاح",
            message: "الكوبون صالح للاستخدام.",
            data: { discount_type: coupon.discount_type, discount_value: coupon.discount_value }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "خطأ", message: "خطأ في التحقق من الكوبون." });
    }
};