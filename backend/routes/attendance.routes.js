const express = require('express');
const multer = require('multer');
const path = require('path');
const Attendance = require('../models/attendance');
const moment = require('moment');
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({ storage: storage });

router.post('/uploadImage', upload.single('image'), async (req, res) => {
    try {
        if (req.file) {
            const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
            const { email, date } = req.body;
            const inputDate = moment(date).startOf('day').toDate();

            let attendance = await Attendance.findOne({
                email,
                date: {
                    $gte: moment(inputDate).startOf('day').toDate(),
                    $lt: moment(inputDate).endOf('day').toDate()
                }
            });
            if (attendance) {
                attendance.image = imageUrl;
              } else {
                attendance = new Attendance({
                    email,
                    date: inputDate,
                    attendance: Array.from({ length: 8 }, (_, i) => ({
                        period: i + 1,
                        status: 'Present',
                    })),
                    image: imageUrl,
                });
            }

            await attendance.save();
            res.json({ message: 'Image uploaded successfully', imageUrl , updatedRecord: attendance });
        }
        else {
            res.status(400).json({ message: 'No image upload' });
        }
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', err });
    }
});

router.get('/history/:email', async (req, res) => {
    try {
        const { email } = req.params;
        const history = await Attendance.find({ email });
        res.json(history);
    } catch (error) {
        res.status(500).json({ message: 'error', error });
    }
});

router.post('/mark', async (req, res) => {
    try {
        const { email, date, attendance } = req.body;
        const record = new Attendance({ email, date, attendance });
        await record.save();
        res.json({ message: 'Attendance marked successfully', record });
    }
    catch (error) {
        res.status(500).json({ message: 'error', error });
    }
});
router.delete('/:id', async(req, res) => {
    await Attendance.findByIdAndDelete(req.params.id)
    .then(() => res.json({ message: 'Attendance deleted successfully' }))
    .catch(error => res.status(500).json({ error: 'Server error' }))
})

module.exports = router;