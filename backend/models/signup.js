const mongoose = require("mongoose");

const registerSchema = new mongoose.Schema({
     name : 
     {  type: String,
        required :true,
     },
     email :
     {
          type : String,
          required : true,
          lowercase: true,
          unique: true,
          validate: {
               validator : function(email){
                    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
               },
               message : "Invalid email"
          }
     },

     password : {
          type: String,
    required: true,
    minlength: 6, // Ensures the password is at least 6 characters long
    validate: {
      validator: function (password) {
        // Regex for at least one special character
        return /[!@#$%^&*(),.?":{}|<>]/.test(password);
      },
      message: 'Password must contain at least one special character.',
     }
}
})

const RegisterModel = new mongoose.model("signups" , registerSchema)

module.exports =  RegisterModel;