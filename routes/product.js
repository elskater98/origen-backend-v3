const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const { authorize } = require('../utils/token');

router.get('/', ProductController.getProducts);
router.get('/:id', ProductController.getProduct);

module.exports = router;