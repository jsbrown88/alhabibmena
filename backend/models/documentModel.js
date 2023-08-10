const mongoose = require('mongoose');

// Define the schema for the dental analysis documents
const DocumentSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  filename: {
    type: String,
    required: true
  },
  uploadDate: {
    type: Date,
    default: Date.now
  },
  vector: {
    type: Array,
    required: true
  },
  translatedText: {
    type: String,
    required: true
  }
});

// Export the model
module.exports = mongoose.model('Document', DocumentSchema);