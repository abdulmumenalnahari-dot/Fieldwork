const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlistController');

// الرابط سيكون: POST /api/wishlist/toggle
router.post('/toggle', wishlistController.toggleWishlist);

module.exports = router;