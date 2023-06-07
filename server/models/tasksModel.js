const mongoose = require('mongoose')

const Schema = mongoose.Schema

const tasksSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    due_date: {
        type: Date,
        required: false
    },
    //notification to notify the user about tasks
    reminde_me: {
        type: Boolean,
        required: false
    },
    //sync task with google\outlook calender
    sync_myTask: {
        type: Boolean,
        required: false
    },

    //userId
    userId:{
        type: String,
        required: false
    }

}, {timestamps: true })

module.exports = mongoose.model('Tasks', tasksSchema)

