const express = require('express');
const router = express.Router();
const CartController = require('../controllers/CartController');
const { authorize } = require('../utils/token');

router.get('/', authorize, CartController.getCarts);
router.get('/:id', authorize, CartController.getCart);
//router.post('/', authorize, CartController.createCart);

module.exports = router;
