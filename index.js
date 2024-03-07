const express = require('express');
const app = express();
const port = 3000;
const multer = require('multer');
const mongoose = require('mongoose');


// 'mongodb://127.0.0.1:27017/pdfDB'

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/pdfDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
});

// Define a Mongoose schema for the PDF documents
const pdfSchema = new mongoose.Schema({
    name: String,
    data: Buffer,
    contentType: String
});

// Create a Mongoose model based on the schema
const PdfModel = mongoose.model('Pdf', pdfSchema);

// Multer configuration
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



// Handle file upload and save it to the MongoDB
app.post('/api/upload', upload.single('file'), async (req, res) => {
    try {
        const { originalname, buffer, mimetype } = req.file;
        const pdf = new PdfModel({
            name: originalname,
            data: buffer,
            contentType: mimetype
        });
        await pdf.save();
        res.json({ message: 'PDF uploaded successfully!' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/api/pdf/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const pdf = await PdfModel.findById(id);
        if (!pdf) {
            return res.status(404).json({ error: 'PDF not found' });
        }
        res.contentType(pdf.contentType);
        res.send(pdf.data);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});