const express = require('express');
const router = express.Router();
const { getProducts } = require('../controllers/productController');
const  authenticate  = require('../middleware/authmiddleware');

router.get('/', authenticate, getProducts);

module.exports = router;
