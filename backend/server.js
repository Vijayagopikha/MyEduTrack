const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config()


const Signup = require("./models/signup");
const todoRoutes = require("./routes/todos");



const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URL);
//signup
app.post('/signup' , (req,res) => {
    Signup.create(req.body)
    .then(result => res.json(result))
    .then(err => res.json(err))
})

//login
app.post('/login' ,(req,res) => {
   const {email,password} = req.body;
   Signup.findOne( {email:email})
   .then(user => {
       if(user){
        if(user.password === password){
            res.json("success")
        }
        else{
            res.json("password is incorrect")
        }
       }
       else{
       res.json("user not found") 
       }
   })
})


//todos
app.use('/todos', todoRoutes);


app.listen(process.env.PORT, () => {
    console.log("connected to mongodb");
})
