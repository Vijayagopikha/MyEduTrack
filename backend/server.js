const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config()


const Signup = require("./models/signup");
const todoRoutes = require("./routes/todos");
const Uploads = require("./routes/image");



const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URL);
//signup
app.post('/signup', (req, res) => {
    Signup.create(req.body)
        .then(result => res.json(result))
        .then(err => res.json(err))
})

//login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    
    Signup.findOne({ email: email })

        .then(user => {
            if (user) {
                if (user.password === password) {

                    res.json({ status: "success" });

                } else {
                    res.json({ status: "error", message: "password is incorrect" });
                }
            } else {
                res.json({ status: "error", message: "user not found" });
            }
        })
        .catch(err => res.status(500).json({ status: "error", message: "Server error" }));
});


//todos
app.use('/todos', todoRoutes);

//images upload
app.use('/upload', Uploads);

app.listen(process.env.PORT, () => {
    console.log("connected to mongodb");
})
