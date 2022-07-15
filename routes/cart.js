const express = require('express');
const {createCart,getCart,removeCart} = require('../controller/cart');
const router = express.Router();
const authenticate = require('../middleware/authenticate');

router.post('/NewCart',authenticate,createCart);
router.get('getCart',authenticate,getCart);
router.delete('removeCartItem',authenticate,removeCart);

module.exports = router;