const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/CategoryController');

router.get('/', ProductController.getCategories);

module.exports = router;