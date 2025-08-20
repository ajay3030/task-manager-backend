const express = require('express');
const { signup, login } = require('../controllers/authController');

const router = express.Router();

// @route   POST /auth/signup
router.post('/signup', signup);

// @route   POST /auth/login
router.post('/login', login);

module.exports = router;
