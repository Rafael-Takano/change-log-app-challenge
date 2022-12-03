const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true      
    },
    creator: {
        type: String,
        required: true,
        trim: true
    },
    startedAt: {
        type: String,
        required: true
    }
})

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;