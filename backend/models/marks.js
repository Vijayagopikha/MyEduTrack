const mongoose = require('mongoose');

const markSchema = new mongoose.Schema({
   subject:{
    type:String,
    required : true
   },
   description: {
    type: String,
    required : true
   },
   marks: {
    type: Number,
    required: true
   },
   email :{
    type: String,
    required: true
   }
})

const markModel = new mongoose.model("marks",markSchema);
module.exports = markModel;