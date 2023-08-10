const mammoth = require('mammoth');

/**
 * Function to extract text from DOCX files.
 * @param {string} filePath - The path of the DOCX file.
 * @returns {Promise<string>} - The extracted text.
 */
async function extractText(filePath) {
    try {
        let result = await mammoth.extractRawText({path: filePath});
        let text = result.value; // The extracted text
        text = text.replace(/(\r\n|\n|\r)/gm, " "); // Remove unnecessary line breaks
        return text;
    } catch (error) {
        console.error(`Error in extracting text from DOCX: ${error}`);
        throw error;
    }
}

module.exports = {
    extractText
};