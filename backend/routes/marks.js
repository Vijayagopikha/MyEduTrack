const express  = require('express');
const router = express.Router();
const Marks = require('../models/marks');

router.post('/', async(req, res) => {
    const {subject, description, marks, email} =req.body;
    if(!subject || !description || !marks || !email){
        return res.status(400).json({error: 'All fields are required'});
    }
    try{
        let newMark = new Marks({
            subject: subject,
            description: description,
            marks: marks,
            email: email
        })

        const save = await newMark.save();
        res.json(save);
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
})

router.get('/',async(req, res) => {
    const email = req.query.email
    if(!email){
        return res.status(400).json({error: 'User email is required'});
    }
    try{
    const marks = await Marks.find({email: email});
    res.json(marks);
    }
    catch(error){
        res.status(500).json({ error: 'Server error' });
    }
})

router.delete('/:id', async(req, res) => {
    await Marks.findByIdAndDelete(req.params.id)
      .then(()=> res.json({ message: 'Mark deleted successfully' }))
      .catch(error => res.status(500).json({ error: 'Server error' }))
})
module.exports = router;