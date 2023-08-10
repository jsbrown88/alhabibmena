const axios = require('axios');
const config = require('../config/config');

// Pinecone API base URL
const PINECONE_BASE_URL = 'https://api.pinecone.io';

/**
 * Function to save the generated vector to Pinecone
 * @param {string} documentId - The ID of the document
 * @param {Array} vector - The generated vector
 * @returns {Promise} - Promise representing the HTTP request
 */
async function saveToPinecone(documentId, vector) {
  const url = `${PINECONE_BASE_URL}/vectors`;

  const data = {
    id: documentId,
    vector: vector
  };

  const options = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.PINECONE_API_KEY}`
    }
  };

  return axios.post(url, data, options);
}

/**
 * Function to fetch the document's vector from Pinecone
 * @param {string} documentId - The ID of the document
 * @returns {Promise} - Promise representing the HTTP request
 */
async function fetchVectorFromPinecone(documentId) {
  const url = `${PINECONE_BASE_URL}/vectors/${documentId}`;

  const options = {
    headers: {
      'Authorization': `Bearer ${config.PINECONE_API_KEY}`
    }
  };

  return axios.get(url, options);
}

module.exports = {
  saveToPinecone,
  fetchVectorFromPinecone
};