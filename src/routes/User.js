const express = require('express')
const UserController = require('../controllers/UserController')

const router = express.Router()

router.get('/', UserController.testRoute)

router.post('/signin', UserController.login)

router.post('/signup', UserController.createUser)

router.delete('/remove', UserController.deleteUser)

module.exports = router