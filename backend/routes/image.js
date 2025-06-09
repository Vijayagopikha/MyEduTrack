const express = require('express')
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { uploadImage } = require('../controllers/uploadController');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        const unique = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originakname);
        cb(null, file.fieldname + '-' + unique + ext);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/;
        const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimeType = fileTypes.test(file.mimetype);

        if (extName && mimeType) {
            return cb(null, true);
        }
        else {
            cb(new Error('Only images are allowed!'));
        }
    }
});

router.post('/upload', upload.single('image', uploadImage));

module.exports = router;