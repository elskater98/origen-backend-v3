const express = require('express');
const router = express.Router();
const AuthenticationController = require('../controllers/AuthenticationController');
const { authorize } = require('../utils/token');

router.post('/', AuthenticationController.ValidateUser);
router.get('/profile', authorize, AuthenticationController.getProfile);

module.exports = router;
