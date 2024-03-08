const mongoose = require('mongoose');

const pdfSchema = new mongoose.Schema({
    username: String,
    accountNumber: Number,
    tinNumber: Number,
    PdfName: String,
    data: Buffer,
    contentType: String
});
module.exports = mongoose.model('Pdf', pdfSchema);