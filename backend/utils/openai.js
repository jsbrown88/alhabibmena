const axios = require('axios');
const config = require('../config/config');

// Function to send the document's vector to OPENAI GPT-4 API and receive the translated text
const translateText = async (vector) => {
  try {
    // Construct a predefined prompt + context
    const prompt = `Translate the following dental analysis: ${vector}`;

    // Send it to OPENAI GPT-4 API
    const response = await axios.post(
      'https://api.openai.com/v4/engines/davinci-codex/completions',
      {
        prompt,
        max_tokens: 500,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${config.OPENAI_API_KEY}`,
        },
      }
    );

    // Return the translated text
    return response.data.choices[0].text;
  } catch (error) {
    console.error(`Error in translating text: ${error}`);
    throw error;
  }
};

module.exports = {
  translateText,
};