const express = require('express');
const router = express.Router();
const Document = require('../models/documentModel');
const pdfParser = require('../utils/pdfParser');
const docxParser = require('../utils/docxParser');
const tfidf = require('../utils/tfidf');
const pinecone = require('../utils/pinecone');
const openai = require('../utils/openai');

// Upload document and process it
router.post('/upload', async (req, res) => {
    try {
        // Extract text from document
        let extractedText;
        if (req.file.mimetype === 'application/pdf') {
            extractedText = await pdfParser.extractText(req.file.path);
        } else if (req.file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            extractedText = await docxParser.extractText(req.file.path);
        } else {
            return res.status(400).json({ message: 'Invalid file type. Please upload a PDF or DOCX file.' });
        }

        // Vectorize the extracted text
        const vector = tfidf.vectorizeText(extractedText);

        // Save the vector to Pinecone
        const pineconeResponse = await pinecone.saveToPinecone(vector);

        // Translate the text using OpenAI GPT-4
        const translatedText = await openai.translateText(vector);

        // Save the document details to the database
        const document = new Document({
            filename: req.file.originalname,
            uploadDate: Date.now(),
            vector: pineconeResponse.id,
            translatedText: translatedText
        });
        await document.save();

        res.status(200).json({ message: 'Document uploaded and processed successfully.', document: document });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while processing the document.' });
    }
});

// Get all documents
router.get('/', async (req, res) => {
    try {
        const documents = await Document.find();
        res.status(200).json(documents);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching the documents.' });
    }
});

// Get a specific document by ID
router.get('/:id', async (req, res) => {
    try {
        const document = await Document.findById(req.params.id);
        if (!document) {
            return res.status(404).json({ message: 'Document not found.' });
        }
        res.status(200).json(document);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching the document.' });
    }
});

module.exports = router;