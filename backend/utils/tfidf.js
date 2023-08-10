const natural = require('natural');
const TfIdf = natural.TfIdf;
const tfidf = new TfIdf();

/**
 * This function takes in a string of text and converts it into a numerical vector using the TF-IDF method.
 * @param {string} text - The text to be vectorized.
 * @returns {Array} - The numerical vector representation of the text.
 */
function vectorizeText(text) {
    tfidf.addDocument(text);
    let vector = [];
    tfidf.listTerms(0 /* in document index 0 */).forEach(function(item) {
        vector.push(item.tfidf);
    });
    return vector;
}

module.exports = vectorizeText;