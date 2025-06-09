const express = require('express')
const router = express.Router()
const Todo = require('../models/todos');

router.post('/', async (req, res) => {
    const { title, description, deadline, email } = req.body;
    if (!title || !description || !deadline || !email) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const newTodo = new Todo({
            title: title,
            description: description,
            deadline: deadline,
            email: email,
            isCompleted: false

        })

        const savedTodo = await newTodo.save();
        res.json(savedTodo);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/', async (req, res) => {
    const userEmail = req.query.email;
    if (!userEmail) {
        return res.status(400).json({ error: 'User email is required' });
    }

    try {
        const todos = await Todo.find({ email: userEmail }); // Fetch todos for the logged-in user
        res.json(todos);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
})

router.delete('/:id', async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id)
        .then(() => res.json({ message: 'Todo deleted successfully' }))
        .catch(err => res.status(500).json({ error: 'Server error' }));

});


router.patch('/:id', async (req, res) => {
    await Todo.findByIdAndUpdate(req.params.id, { isCompleted: true }, { new: true })

        .then(updateTodo => res.json(updateTodo))
        .catch(err => res.status(500).json({ error: 'Server Error' }))
});

module.exports = router;