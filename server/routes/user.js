const express = require('express')

// controller functions
const { loginUser, signupUser } = require('../controllers/userController')

const router = express.Router()

// login route
router.post('https://reminders-km7j.onrender.com/login', loginUser)

// signup route
router.post('https://reminders-km7j.onrender.com/signup', signupUser)

module.exports = router