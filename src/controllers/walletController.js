const db = require('../config/db');

exports.chargeWallet = async (req, res) => {
    try {
        const { core_user_id, amount } = req.body;
        
        await db.execute(
            `UPDATE user_profiles SET wallet_balance = wallet_balance + ? WHERE core_user_id = ?`,
            [amount, core_user_id]
        );

        await db.execute(
            `INSERT INTO audit_logs (core_user_id, action, details) VALUES (?, ?, ?)`,
            [core_user_id, 'شحن المحفظة', `تم شحن المحفظة بمبلغ ${amount}`]
        );

        res.status(200).json({ status: "نجاح", message: "تم شحن المحفظة بنجاح." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "خطأ", message: "تعذر شحن المحفظة." });
    }
};

exports.getBalance = async (req, res) => {
    try {
        const { user_id } = req.params;
        const [rows] = await db.execute(`SELECT wallet_balance FROM user_profiles WHERE core_user_id = ?`, [user_id]);
        
        res.status(200).json({
            status: "نجاح",
            balance: rows.length > 0 ? rows[0].wallet_balance : 0
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "خطأ", message: "تعذر جلب الرصيد." });
    }
};