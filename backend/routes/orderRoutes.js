const express = require('express');
const router = express.Router();
const { placeOrder, getOrderById } = require('../controllers/orderController');

router.post('/', placeOrder);
router.get('/:id', getOrderById);

module.exports = router;