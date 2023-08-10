const axios = require('axios');
const { OPENAI_API_KEY } = require('../config/config');

// Function to send the document's vector to OPENAI GPT-4 API and receive the translated text
const translateText = async (vector) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v4/engines/davinci-codex/completions',
      {
        prompt: vector,
        max_tokens: 60,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        }
      }
    );

    if (response.data) {
      return response.data.choices[0].text;
    } else {
      throw new Error('Translation failed');
    }
  } catch (error) {
    console.error(`Error in translating text: ${error}`);
    throw error;
  }
};

module.exports = {
  translateText
};