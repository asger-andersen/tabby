const express = require('express')
const router = express.Router()
const { 
    generateReceipt
} = require('../controllers/receiptController.js')
const { protect } = require('../middleware/authMiddleware')

router.post('/generate', protect, generateReceipt)

module.exports = router