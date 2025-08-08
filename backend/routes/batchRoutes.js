const express = require('express');
const { addProductBatch } = require('../controllers/batchController');
const authenticate = require('../middleware/authmiddleware');

const router = express.Router();

router.post('/', authenticate, addProductBatch); // Only logged-in users

module.exports = router;
