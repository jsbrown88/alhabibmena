// Importing the dotenv package
const dotenv = require('dotenv');

// Configuring dotenv to use the .env file
dotenv.config();

// Exporting the API keys
module.exports = {
  PINECONE_API_KEY: process.env.PINECONE_API_KEY,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY
};