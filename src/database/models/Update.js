const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    }
})

const updateSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true      
    },
    project: {
        type: String,
        required: true,
        trim: true      
    },
    creator: {
        type: String,
        required: true,
        trim: true
    },
    updatedAt: {
        type: String,
        required: true
    },
    topics: {
        type: [topicSchema],
        required: true
    }
})

const Update = mongoose.model('Update', updateSchema);
const Topic = mongoose.model('Topic', topicSchema);
module.exports = {Update , Topic};