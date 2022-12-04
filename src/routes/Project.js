const express = require('express')
const ProjectController = require('../controllers/ProjectController')
const update = require('./Update') 

const router = express.Router()

router.get('/', ProjectController.readProjectAll)

router.get('/byName/:name', ProjectController.readProjectTitle)

router.get('/byCreator/:creator', ProjectController.readProjectCreator)

router.get('/byDate/:date', ProjectController.readProjectDate)

router.post('/:project', ProjectController.addProject)

router.put('/:project', ProjectController.modifyProject)

router.delete('/:project', ProjectController.deleteProject)

router.use('/:project/update', update)

module.exports = router