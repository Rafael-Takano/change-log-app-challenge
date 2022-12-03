
const Project = require('../database/models/Project')
const {Update, Topic}= require('../database/models/Update')

const addUpdate = async (req,res) => {
    let exists = await Update.findOne({ title: req.body.title })
    if(exists) return res.status(400).send({error: `Update: ${req.body.title} already exists`})

    // Need to verify the existence of the project and the user yet
    try {
        const topicArray = req.body.topics
        let TopicArray = []

        if(typeof topicArray != 'object' || topicArray.length == 0)
            return res.status(400).send({error: `Topics is empty or is not array like`})
        if(!req.body.title || typeof req.body.title != 'string')
            return res.status(400).send({error: `title undefined, or isn't a String`})
        if(!req.body.project || typeof req.body.project != 'string')
            return res.status(400).send({error: `project undefined, or isn't a String`})
        if(!req.body.user || typeof req.body.user != 'string')
            return res.status(400).send({error: `user undefined, or isn't a String`})

        for(t of topicArray) {
            TopicArray.push(new Topic({text: t}))
        }
        let d = new Date(); 
        let datetext = d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
        console.log(datetext)
        const update = new Update({
            title: req.body.title,
            project: req.body.project,
            creator: req.body.user,
            updatedAt: datetext,
            topics: TopicArray
        })
        console.log(update)
        await update.save()
        return res.status(201).send({
            update
        })
    }
    catch (err) {
        console.log(err)
        return res.status(400).send({err})
    }
}

const readUpdate = async (req,res) => {}

const modifyUpdate = async (req,res) => {}

const deleteUpdate = async (req,res) => {}

module.exports = { addUpdate, readUpdate, modifyUpdate, deleteUpdate}