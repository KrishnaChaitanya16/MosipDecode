const express = require('express');
const router = express.Router();
const { getUserDetails } = require('../controllers/userController');
const authenticate = require('../middleware/authmiddleware');

router.get('/me', authenticate, getUserDetails);

module.exports = router;
