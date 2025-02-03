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
    .catch(err => {
        res.status(500).json({ error: err.message });  
    });
 
 })

router.get('/', (req,res) => {
    Todo.find()
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

router.delete('/:id', (req,res) => {
    Todo.findByIdAndDelete(req.params.id)
    .then(() => res.json({message: 'Todo deleted successfully'}))
    .catch(err => res.status(500).json({error: 'Server error'}));

});

router.patch(':/id', (req,res) => {
    Todo.findByIdAndUpdate(req.params.id, {isCompleted: true}, {new:true})
    .then(updateTodo => res.json(updateTodo))
    .catch(err => res.status(500).json({error:'Server Error'}))
});

module.exports =  router;