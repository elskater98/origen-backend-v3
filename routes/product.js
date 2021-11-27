const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const { authorize } = require('../utils/token');

router.get('/', authorize, ProductController.getProducts);
//router.get('/:id', authorize, CartController.getCart);

module.exports = router;