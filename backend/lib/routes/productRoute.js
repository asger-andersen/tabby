const express = require('express')
const router = express.Router()
const {
    createProduct
} = require('../controllers/productController.js')
const { protect } = require('../middleware/authMiddleware')

router.post('/create', protect, createProduct)

module.exports = router