const mongoose = require('mongoose');


const todoScheme = new mongoose.Schema({
    title:
    {
        type: String,
        required: true
    },
    description: {
        type: String,
        required : true
    },
    deadline:
    {
        type: Date,
        required : true
    },
    email: {
        type: String,
        required: true
    },

    isCompleted:
    {
        type: Boolean,
        default: false
    }

})

const todoModel = new mongoose.model("todos", todoScheme);
module.exports = todoModel;