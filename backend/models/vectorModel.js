const mongoose = require('mongoose');

// Define the schema for the vector model
const VectorSchema = new mongoose.Schema({
  documentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Document',
    required: true,
    unique: true
  },
  vector: {
    type: [Number],
    required: true
  }
});

// Export the model
module.exports = mongoose.model('Vector', VectorSchema);