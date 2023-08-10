const assert = require('assert');
const pineconeUtils = require('../utils/pinecone');

describe('Pinecone Utils', () => {
  describe('#saveToPinecone()', () => {
    it('should save the vector to Pinecone without error', async () => {
      const vector = [0.1, 0.2, 0.3, 0.4, 0.5];
      const result = await pineconeUtils.saveToPinecone(vector);
      assert(result.success);
    });
  });

  describe('#fetchFromPinecone()', () => {
    it('should fetch the vector from Pinecone without error', async () => {
      const id = 'test_id';
      const result = await pineconeUtils.fetchFromPinecone(id);
      assert(result.success);
      assert(Array.isArray(result.vector));
    });
  });
});