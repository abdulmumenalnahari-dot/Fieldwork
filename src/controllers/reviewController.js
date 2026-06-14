const db = require('../config/db');

exports.addReview = async (req, res) => {
    try {
        const { core_user_id, core_product_id, rating, comment } = req.body;

        if (rating < 1 || rating > 5) {
            return res.status(400).json({ status: "خطأ", message: "التقييم يجب أن يكون بين 1 و 5." });
        }

        await db.execute(
            `INSERT INTO reviews (core_user_id, core_product_id, rating, comment) VALUES (?, ?, ?, ?)`,
            [core_user_id, core_product_id, rating, comment]
        );

        res.status(200).json({ status: "نجاح", message: "تمت إضافة التقييم بنجاح." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "خطأ", message: "تعذر إضافة التقييم." });
    }
};