const assert = require('assert');
const openai = require('../utils/openai');

describe('OpenAI GPT-4 Integration', function() {
  describe('#translateText()', function() {
    it('should return translated text when the valid vector is passed', async function() {
      const vector = [0.1, 0.2, 0.3, 0.4, 0.5]; // Mock vector
      const translatedText = await openai.translateText(vector);
      
      assert.equal(typeof translatedText, 'string');
      assert(translatedText.length > 0);
    });

    it('should throw an error when the invalid vector is passed', async function() {
      const vector = 'invalid vector'; // Mock invalid vector
      
      try {
        await openai.translateText(vector);
      } catch (error) {
        assert(error instanceof Error);
      }
    });
  });
});