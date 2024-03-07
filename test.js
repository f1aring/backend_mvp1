const { PDFDocument, rgb } = require('pdf-lib');

async function getPageWithNumber(pdfBytes) {
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const pages = pdfDoc.getPages();
    const pageObjects = [];

    for (let i = 0; i < pages.length; i++) {
        const pageNumber = i + 1;
        const page = pages[i];
        pageObjects.push({ page, pageNumber });
    }

    return pageObjects;
}

// Example usage:
const fs = require('fs').promises;

(async () => {
    try {
        const pdfBytes = await fs.readFile('./sop-5.pdf');
        const pagesWithNumbers = await getPageWithNumber(pdfBytes);
        console.log(pagesWithNumbers);
    } catch (error) {
        console.error('Error:', error);
    }
})();