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