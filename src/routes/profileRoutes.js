const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const profileController = require('../controllers/profileController');

// الرابط سيكون: POST /api/profile
// نقوم بتمرير وسيط الرفع upload.single('avatar') لاستقبال صورة واحدة
router.post('/', upload.single('avatar'), profileController.createOrUpdateProfile);

module.exports = router;