// backend/src/routes/authRoutes.js

const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/authController');

// Endpoint för användarregistrering
router.post('/register', registerUser);

module.exports = router;
