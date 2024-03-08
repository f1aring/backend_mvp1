const model = require('./PDF.model');

exports.sendUerData = async (id)=>{
    try {
        console.log(id)
        const data = await model.findOne({username: id});
        return data
    } catch (error) {
        throw new Error('Data from the db is not being fetched');
    }
}

exports.uploadData = async (username, accountNumber, tinNumber, originalname, buffer, mimetype )=>{
    try {
        const upload = await model.create({
            username,
            accountNumber,
            tinNumber,
            PdfName: originalname,
            data: buffer,
            contentType: mimetype
        })
        
    } catch (error) {
        throw new Error('Data is not getting stored');
    }
}