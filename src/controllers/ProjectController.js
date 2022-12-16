const Project = require('../database/models/Project')
const {User} = require('./UserController')
const {Update}= require('../database/models/Update')
const url = require('url');

const addProject = async (req,res) => {
    let exists = await Project.findOne({ title: req.params.project })
    if(exists) 
        return res.status(400).json({error: `Project: ${req.params.project} already exists`})

    try {
        if(!req.params.project || typeof req.params.project != 'string')
            return res.status(400).json({error: `title undefined, or isn't a String`})        
        if(!req.body.login || typeof req.body.login != 'string')
            return res.status(400).json({error: `login undefined, or isn't a String`})    
        if(req.body.login){
            let user = await User.findOne({login: req.body.login})              
            if(!user) 
                return res.status(401).json({error: "Creator of the project doesn't exists on db"})
        }

        let datetext = new Date().toLocaleDateString('pt-BR');         

        const project = new Project({
            title: req.params.project,
            creator: req.body.login,
            startedAt: datetext
        })

        project.save()
        return res.status(201).json({
            msg: "Project Created!",
            project
        })
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({err})
    }
}

function pagination (query, offset, limit) {
    if(!limit) limit = 1000
    if(!offset) offset = 0
    limit = parseInt(limit)
    offset = parseInt(offset)    
    return query.slice(offset,offset+limit)
}

const readProjectAll = async (req,res) => {
    let query = await Project.find({}).sort({startedAt: -1})
    q_params = url.parse(req.url, true).query
    query = pagination(query,q_params['offset'],q_params['limit'])
    return res.status(201).json({query})
}

const readProjectTitle = async (req,res) => {
    let name = new RegExp(`${req.params.name}`,"i")
    let query = await Project.find({title: name }).sort({startedAt: -1})
    
    q_params = url.parse(req.url, true).query
    query = pagination(query,q_params['offset'],q_params['limit'])

    return res.status(201).json({query})
}

const readProjectCreator = async (req,res) => {
    let query = await Project.find({creator: req.params.creator}).sort({startedAt: -1})
    
    q_params = url.parse(req.url, true).query
    query = pagination(query,q_params['offset'],q_params['limit'])

    return res.status(201).json({query})
}

const readProjectDate = async (req,res) => {
    let query = await Project.find({startedAt: req.params.date}).sort({startedAt: -1})    
    
    q_params = url.parse(req.url, true).query
    query = pagination(query,q_params['offset'],q_params['limit'])

    return res.status(201).json({query})
}

const modifyProject = async (req,res) => {
    const update = await Project.findOne({ title: req.params.project })
    if(!update) 
        return res.status(400).json({error: `Update: ${req.params.project} doesn't exists, use POST instead`})
    try{
        if(req.body.creator){
            let user = await User.findOne({login: req.body.creator}) 
            if(!user) 
                return res.status(401).json({error: "New creator of the project doesn't exists on db"})
        }
        const result = await Project.findOneAndUpdate({title: req.params.project},req.body)
    
        if(req.body.title && req.body.title != {title: req.params.project}) await Update.updateMany({project: req.params.project},{project: req.body.title})
    
        return res.status(201).json({result})
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({err}) 
    }
}

const deleteProject = async (req,res) => {
    try {
        project_deleted = await Project.deleteOne({title: req.params.project})
        updates_deleted = await Update.deleteMany({project: req.params.project})

        return res.status(201).json({project_deleted,updates_deleted})
    }
    catch (err) {
        return res.status(500).json(err)
    }
}

module.exports = {addProject, readProjectAll, readProjectTitle, readProjectCreator, readProjectDate, modifyProject, deleteProject}