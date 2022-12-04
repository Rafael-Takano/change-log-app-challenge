const express = require('express')
const ProjectController = require('../controllers/ProjectController')

const router = express.Router()

router.get('/', ProjectController.readProjectAll)

router.get('/byCreator/:creator', ProjectController.readProjectCreator)

router.get('/byDate/:date', ProjectController.readProjectDate)

router.post('/:project', ProjectController.addProject)

router.put('/:project', ProjectController.modifyProject)

router.delete('/:project', ProjectController.deleteProject)

module.exports = router