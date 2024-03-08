// 'mongodb://127.0.0.1:27017/pdfDB'

const mongoose = require('mongoose');



async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/pdfDB',{ useNewUrlParser: true, useUnifiedTopology: true });
}

module.exports = {main};