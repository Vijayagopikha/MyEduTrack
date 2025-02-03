const express = require('express')
const router = express.Router()
const Todo = require('../models/todos');

router.post('/', (req,res) => {
    const {title, description, deadline} = req.body;
    if (!title || !description || !deadline) {
     return res.status(400).json({ error: 'All fields are required' });
 }
 
    Todo.create({
        title:title,
        description:description,
        deadline:deadline,
        isCompleted:false
        
    })
    .then(result => res.json(result))
    .catch(err => res.json(err))
 
 })

router.get('/', (req,res) => {
    Todo.find()
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

module.exports =  router;