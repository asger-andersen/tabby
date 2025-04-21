const express = require('express')
const router = express.Router()
const {
    createCategory
} = require('../controllers/categoryController.js')
const { protect } = require('../middleware/authMiddleware')

router.post('/create', protect, createCategory)

module.exports = router