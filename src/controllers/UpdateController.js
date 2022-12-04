
const Project = require('../database/models/Project')
const {Update, Topic}= require('../database/models/Update')
const url = require('url');

const addUpdate = async (req,res) => {
    let exists = await Update.findOne({ title: req.params.update })
    if(exists) return res.status(400).send({error: `Update: ${req.params.update} already exists`})

    // Need to verify the existence of the project and the user yet
    try {
        const topicArray = req.body.topics
        let TopicArray = []

        if(typeof topicArray != 'object' || topicArray.length == 0)
            return res.status(400).send({error: `Topics is empty or is not array like`})
        if(!req.params.update || typeof req.params.update != 'string')
            return res.status(400).send({error: `title undefined, or isn't a String`})
        if(!req.body.project || typeof req.body.project != 'string')
            return res.status(400).send({error: `project undefined, or isn't a String`})
        if(!req.body.login || typeof req.body.login != 'string')
            return res.status(400).send({error: `login undefined, or isn't a String`})

        for(t of topicArray) {
            TopicArray.push(new Topic({text: t}))
        }
        let d = new Date(); 
        let datetext = d.getDate()+"-"+(d.getMonth()+1)+"-"+d.getFullYear();

        const update = new Update({
            title: req.params.update,
            project: req.body.project,
            creator: req.body.login,
            updatedAt: datetext,
            topics: TopicArray
        })        

        await update.save()
        return res.status(201).send({
            update
        })
    }
    catch (err) {        
        return res.status(400).send({err})
    }
}

const readUpdateAll = async (req,res) => {
    try {

        console.log(url.parse(req.url, true).query)
        return res.status(201).send(url.parse(req.url, true).query) 
    }
    catch (err){
        console.log(err)
        return res.status(500).send(err)
    }
    return res.status(500).send({err: "Not implemented yet"})    
}

const readUpdateCreator = async (req,res) => {
    console.log(url.parse(req.url, true).query)
    return res.status(201).send(url.parse(req.url, true).query)    
}

const readUpdateDate = async (req,res) => {
    console.log(url.parse(req.url, true).query)
    return res.status(201).send(url.parse(req.url, true).query) 
    return res.status(500).send({err: "Not implemented yet"})    
}

const modifyUpdate = async (req,res) => {
    const update = await Update.findOne({ title: req.params.update })
    if(!update) return res.status(400).send({error: `Update: ${req.params.update} doesn't exists, use POST instead`})
    return res.status(500).send({err: "Not implemented yet"})    
}

const deleteUpdate = async (req,res) => {
    return res.status(500).send({err: "Not implemented yet"})    
}

module.exports = { addUpdate, readUpdateAll, readUpdateCreator, readUpdateDate, modifyUpdate, deleteUpdate}