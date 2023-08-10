const assert = require('assert');
const { vectorizeText } = require('../utils/tfidf');

describe('TF-IDF Vectorization', function() {
  describe('#vectorizeText()', function() {
    it('should return a numerical vector when given a string of text', function() {
      const text = 'This is a test string for TF-IDF vectorization.';
      const vector = vectorizeText(text);
      
      assert(Array.isArray(vector), 'Output is not an array');
      vector.forEach(val => assert(typeof val === 'number', 'Vector contains non-numerical values'));
    });

    it('should handle empty strings without errors', function() {
      const text = '';
      const vector = vectorizeText(text);
      
      assert(Array.isArray(vector), 'Output is not an array');
      vector.forEach(val => assert(typeof val === 'number', 'Vector contains non-numerical values'));
    });

    it('should handle strings with special characters without errors', function() {
      const text = 'This string contains special characters: !@#$%^&*()';
      const vector = vectorizeText(text);
      
      assert(Array.isArray(vector), 'Output is not an array');
      vector.forEach(val => assert(typeof val === 'number', 'Vector contains non-numerical values'));
    });
  });
});