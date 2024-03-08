const model = require('../model/PDF/PDF.query');
exports.fetchData = async(req, res)=>{
    try {
        const {username} = req.params;
        
        const pdf = await model.sendUerData(username);
        if (!pdf) {
            return res.status(404).json({ error: `PDF not found of ${accountNumber}` });
        }
        // res.setHeader('Content-Type', 'application/pdf');

        res.contentType(pdf.contentType);
        res.send(pdf.data);
    } catch (error) {
        console.log(error)
    }
}
exports.uploadData = async(req, res)=>{
    try {
        const { username, accountNumber, tinNumber } = req.body;
        const { originalname, buffer, mimetype } = req.file;
        const data = await model.uploadData(username, accountNumber, tinNumber, originalname, buffer, mimetype);
        res.json({ message: 'PDF uploaded successfully!' });
    } catch (error) {
        console.log(error)
    }
}