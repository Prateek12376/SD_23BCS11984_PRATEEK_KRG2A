const express = require('express');
const router = express.Router();
const { getCart, addToCart, updateCartItem, removeFromCart, clearCart } = require('../controllers/cartController');
const { cartLimiter } = require('../middleware/rateLimiter');

router.get('/:session_id', getCart);                    //  no limit
router.post('/', cartLimiter, addToCart);               //  limited
router.put('/:id', cartLimiter, updateCartItem);        //  limited
router.delete('/clear/:session_id', clearCart);         //  no limit
router.delete('/:id', cartLimiter, removeFromCart);     //  limited

module.exports = router;