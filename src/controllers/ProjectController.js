const Project = require('../database/models/Project')
const url = require('url');

const addProject = async (req,res) => {
    let exists = await Project.findOne({ title: req.params.project })
    if(exists) return res.status(400).send({error: `Project: ${req.params.project} already exists`})

    try {
        if(!req.params.project || typeof req.params.project != 'string')
            return res.status(400).send({error: `title undefined, or isn't a String`})        
        if(!req.body.login || typeof req.body.login != 'string')
            return res.status(400).send({error: `login undefined, or isn't a String`})    

        let d = new Date(); 
        let datetext = d.getDate()+"-"+(d.getMonth()+1)+"-"+d.getFullYear();

        const project = new Project({
            title: req.params.project,
            creator: req.body.login,
            startedAt: datetext
        })

        project.save()
        return res.status(201).send({
            msg: "Project Created!",
            project
        })
    }
    catch (err) {
        return res.status(400).send({err})
    }
}
function pagination (query, offset, limit) {
    if(!limit) limit = 1000
    if(!offset) offset = 0
    return query.slice(offset,limit)
}
const readProjectAll = async (req,res) => {
    let query = await Project.find({}).sort({startedAt: -1})
    q_params = url.parse(req.url, true).query
    query = pagination(query,q_params['offset'],q_params['limit'])
    return res.status(201).send({query})
}

const readProjectCreator = async (req,res) => {
    let query = await Project.find({creator: req.params.creator}).sort({startedAt: -1})
    
    q_params = url.parse(req.url, true).query
    query = pagination(query,q_params['offset'],q_params['limit'])

    return res.status(201).send({query})
}

const readProjectDate = async (req,res) => {
    let query = await Project.find({startedAt: req.params.date}).sort({startedAt: -1})    
    
    q_params = url.parse(req.url, true).query
    query = pagination(query,q_params['offset'],q_params['limit'])

    return res.status(201).send({query})
}

const modifyProject = async (req,res) => {}

const deleteProject = async (req,res) => {}

module.exports = {addProject, readProjectAll, readProjectCreator, readProjectDate, modifyProject, deleteProject}