const express = require('express');
const { addProductBatch } = require('../controllers/batchController');
const authenticate = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authenticate, addProductBatch); // Only logged-in users

module.exports = router;
