const express = require('express')
const UserController = require('../controllers/UserController')

const router = express.Router()

router.post('/signin', UserController.login)

router.post('/signup', UserController.createUser)

router.put('/changepassword', UserController.change_password)

router.delete('/remove', UserController.deleteUser)

module.exports = router