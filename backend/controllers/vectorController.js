const express = require('express');
const router = express.Router();
const tfidf = require('../utils/tfidf');
const pinecone = require('../utils/pinecone');
const Document = require('../models/documentModel');

// Route to vectorize text and save to Pinecone
router.post('/vectorize', async (req, res) => {
    try {
        // Extract text from request
        const { text, documentId } = req.body;

        // Vectorize text using TF-IDF
        const vector = tfidf.vectorizeText(text);

        // Save vector to Pinecone
        const pineconeResponse = await pinecone.saveToPinecone(vector);

        // Update document in database with vector
        const document = await Document.findById(documentId);
        document.vector = vector;
        await document.save();

        // Send response
        res.json({ message: 'Vectorization successful', vector, pineconeResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Vectorization failed', error });
    }
});

module.exports = router;