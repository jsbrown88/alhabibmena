const express = require('express');
const router = express.Router();

// Importing controllers
const documentController = require('../controllers/documentController');
const vectorController = require('../controllers/vectorController');
const gpt4Controller = require('../controllers/gpt4Controller');

// Route to handle document upload
router.post('/upload', documentController.uploadDocument, (req, res) => {
    res.status(200).json({ message: 'UPLOAD_SUCCESS' });
});

// Route to handle text extraction and vectorization
router.post('/process', documentController.extractText, vectorController.vectorizeText, (req, res) => {
    res.status(200).json({ message: 'PROCESS_SUCCESS' });
});

// Route to handle saving vector to Pinecone
router.post('/save', vectorController.saveToPinecone, (req, res) => {
    res.status(200).json({ message: 'SAVE_SUCCESS' });
});

// Route to handle translation with GPT-4
router.get('/translate/:id', gpt4Controller.translateText, (req, res) => {
    res.status(200).json({ message: 'TRANSLATION_SUCCESS', translatedText: req.translatedText });
});

module.exports = router;