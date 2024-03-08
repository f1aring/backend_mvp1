const router = require('express').Router();
const controller = require('./controller/PDF.controller');
const multer = require('multer');

const upload = multer({ 
    storage: multer.memoryStorage(), // Store file in memory
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF files are allowed!'), false);
        }
    }
});
router.get('/file/:id', controller.fetchData);
router.post('/file', upload.single('file'), controller.uploadData);

module.exports = router;