const express = require('express')
const router = express.Router()
const {
    productInformation
} = require('../controllers/productController')
const { protect } = require('../middleware/authMiddleware')

router.get('/getinformation', protect, productInformation)

module.exports = router