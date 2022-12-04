const express = require('express')
const UpdateController = require('../controllers/UpdateController')

const router = express.Router()

router.get('/', UpdateController.readUpdateAll)

router.get('/byCreator/:creator', UpdateController.readUpdateCreator)

router.get('/byDate/:date', UpdateController.readUpdateDate)

router.post('/:update', UpdateController.addUpdate)

router.put('/:update', UpdateController.modifyUpdate)

router.delete('/:update', UpdateController.deleteUpdate)

module.exports = router