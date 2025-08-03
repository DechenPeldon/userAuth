const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Root route
router.get('/', authController.getLanding);

// Signup routes
router.get('/signup', authController.getSignUp);
router.post('/signup', authController.postSignUp);

// Login routes
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);

// Logout route
router.get('/logout', authController.logout);

// Forgot password routes (simplified)
router.get('/forgot-password', authController.getForgotPassword);
router.get('/reset-password', authController.getResetPassword);

module.exports = router;

