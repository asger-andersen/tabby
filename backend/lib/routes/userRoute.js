const express = require('express')
const router = express.Router()
const {
    createUser,
    signIn,
    verifySession,
    getUserData
} = require('../controllers/userController.js')
const { protect } = require('../middleware/authMiddleware')

router.post('/create', createUser)
router.post('/signin', signIn)
router.get('/getdata', protect, getUserData)

module.exports = router