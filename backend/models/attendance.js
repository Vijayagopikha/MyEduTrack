const mongoose = require('mongoose');

const Attendance = new mongoose.Schema({
      email:{
            type: String,
            required : true
      },
      date:{
        type: Date, 
        required: true
      },
      attendance: [
        {
            period: Number,
            status:{
                type: String,
                enum: ['Present','Absent','On-Duty'],
                default: 'Present'
            },
           
        }
      ],

      image:{
        type: String,
        required: false
      }
});

const AttendanceModel = new mongoose.model("attendance",Attendance);
module.exports = AttendanceModel;