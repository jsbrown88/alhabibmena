const pdfParse = require('pdf-parse');

/**
 * Function to extract text from PDF files
 * @param {Buffer} dataBuffer - The buffer containing the PDF data
 * @returns {Promise<string>} - A promise that resolves to the extracted text
 */
const extractText = (dataBuffer) => {
    return pdfParse(dataBuffer)
        .then(data => {
            // The 'text' property of the data object contains the extracted text
            return data.text;
        })
        .catch(err => {
            console.error(`Error while extracting text from PDF: ${err}`);
            throw err;
        });
};

module.exports = {
    extractText
};