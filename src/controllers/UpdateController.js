
const Project = require('../database/models/Project')
const {Update, Topic}= require('../database/models/Update')
const url = require('url');
const { User } = require('./UserController');

const expandParams = function (req) {
    let path = req.baseUrl
    return path.split('/')[2]    
}

function pagination (query, offset, limit) {
    if(!limit) limit = 1000
    if(!offset) offset = 0
    limit = parseInt(limit)
    offset = parseInt(offset)    
    return query.slice(offset,offset+limit)
}

const addUpdate = async (req,res) => {
    req.params.project = expandParams(req)

    project = await Project.findOne({title: req.params.project})
    if(!project) 
        return res.status(400).json({err: `Project: ${req.params.project} doesn't exists in the db.`})
    
    let exists = await Update.findOne({ title: req.params.update, project: req.params.project })
    if(exists) 
        return res.status(400).json({error: `Update: ${req.params.update} already exists in Project: ${req.params.project}`})

    
    try {
        const topicArray = req.body.topics
        let TopicArray = []

        if(typeof topicArray != 'object' || topicArray.length == 0)
            return res.status(400).json({error: `Topics is empty or is not array like`})
        if(!req.params.update || typeof req.params.update != 'string')
            return res.status(400).json({error: `title undefined, or isn't a String`})
        if(!req.params.project || typeof req.params.project != 'string')
            return res.status(400).json({error: `project undefined, or isn't a String`})
        if(!req.body.login || typeof req.body.login != 'string')
            return res.status(400).json({error: `login undefined, or isn't a String`})
        
        let login = await User.findOne({login: req.body.login})
        if(!login) 
            res.status(400).json({err: `User: ${req.body.login} doesn't exists in the db.`})
        

        for(t of topicArray) {
            TopicArray.push(new Topic({text: t}))
        }
        let datetext = new Date().toLocaleDateString('pt-BR');        

        const update = new Update({
            title: req.params.update,
            project: req.params.project,
            creator: req.body.login,
            updatedAt: datetext,
            topics: TopicArray
        })        

        await update.save()
        return res.status(201).json({
            update
        })
    }
    catch (err) {       
        console.log(err) 
        return res.status(400).json({err})
    }
}

const readUpdateAll = async (req,res) => {
    req.params.project = expandParams(req)
    project = await Project.findOne({title: req.params.project})
    if(!project) 
        res.status(400).json({err: `Project: ${req.params.project} doesn't exists in the db.`})

    let query = await Update.find({project: req.params.project}).sort({updatedAt: -1})
    q_params = url.parse(req.url, true).query
    query = pagination(query,q_params['offset'],q_params['limit'])
    return res.status(201).json({query})  
}

const readUpdateName = async (req,res) => {
    req.params.project = expandParams(req)
    project = await Project.findOne({title: req.params.project})
    if(!project) 
        return res.status(400).json({err: `Project: ${req.params.project} doesn't exists in the db.`})

    let name = new RegExp(`${req.params.name}`,"i")

    let query = await Update.find({project: req.params.project, title: name}).sort({updatedAt: -1})
    
    q_params = url.parse(req.url, true).query
    query = pagination(query,q_params['offset'],q_params['limit'])

    return res.status(201).json({query})    
}

const readUpdateCreator = async (req,res) => {
    req.params.project = expandParams(req)
    project = await Project.findOne({title: req.params.project})
    if(!project) 
        return res.status(400).json({err: `Project: ${req.params.project} doesn't exists in the db.`})

    let query = await Update.find({project: req.params.project, creator: req.params.creator}).sort({updatedAt: -1})
    
    q_params = url.parse(req.url, true).query
    query = pagination(query,q_params['offset'],q_params['limit'])

    return res.status(201).json({query})    
}

const readUpdateDate = async (req,res) => {
    req.params.project = expandParams(req)
    project = await Project.findOne({title: req.params.project})
    if(!project) 
        return res.status(400).json({err: `Project: ${req.params.project} doesn't exists in the db.`})

    let query = await Update.find({project: req.params.project, updatedAt: req.params.date}).sort({updatedAt: -1})    
    
    q_params = url.parse(req.url, true).query
    query = pagination(query,q_params['offset'],q_params['limit'])

    return res.status(201).json({query})   
}

const modifyUpdate = async (req,res) => {
    req.params.project = expandParams(req)    
    const update = await Update.findOne({ title: req.params.update, project: req.params.project})
    if(!update) 
        return res.status(400).json({error: `Update: ${req.params.update} doesn't exists, use POST instead`})
    
    try{
        if(req.body.creator){
            let user = await User.findOne({login: req.body.creator}) 
            if(!user) 
                return res.status(401).json({error: "New creator of the project doesn't exists on db"})
        }
        if(req.body.project) 
            if(req.body.project != req.params.project)
                return res.status(401).json({error: "An update can't change between projects"})

        if(req.body.title) {
            let title = await Update.findOne({title: req.body.title, project: req.params.project})
            if(title)
                return res.status(401).json({error: "The new update name already exists on the same project"})
        }
        
        if(req.body.topics) {

            if(typeof req.body.topics != 'object' || req.body.topics.length === 0)
                return res.status(400).json({error: `Topics is empty or is not array like`})
            else {
                let TopicArray = []
                for(t of req.body.topics) {
                    TopicArray.push(new Topic({text: t}))
                }

                const result = await Update.findOneAndUpdate({title: req.params.update, project: req.params.project}, {title: req.body.title, creator: req.body.creator, updatedAt: req.body.updatedAt,topics: TopicArray})            
                return res.status(201).json({result})
            }

        }
        else {
            const result = await Update.findOneAndUpdate({title: req.params.update, project: req.params.project},req.body)            
            return res.status(201).json({result})
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({err}) 
    }     
}

const deleteUpdate = async (req,res) => {
    req.params.project = expandParams(req)

    try {        
        updates_deleted = await Update.deleteOne({title: req.params.update,project: req.params.project})

        return res.status(201).json({updates_deleted})
    }
    catch (err) {
        return res.status(500).json(err)
    } 
}

module.exports = { addUpdate, readUpdateAll, readUpdateName, readUpdateCreator, readUpdateDate, modifyUpdate, deleteUpdate}