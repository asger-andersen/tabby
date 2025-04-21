const express = require('express')
const router = express.Router()
const {
    getCompany,
    joinCompany
} = require('../controllers/companyController.js')
const { protect } = require('../middleware/authMiddleware')

router.get('/get', protect, getCompany)
router.put('/join', protect, joinCompany)

module.exports = router