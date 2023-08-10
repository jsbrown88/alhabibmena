const request = require('supertest');
const app = require('../server');
const { uploadDocument } = require('../controllers/documentController');

describe('Document Controller', () => {
  // Test for successful document upload
  it('should upload a document', async () => {
    const res = await request(app)
      .post('/api/documents')
      .attach('document', 'test.pdf');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'UPLOAD_SUCCESS');
  });

  // Test for failed document upload
  it('should fail to upload a non-PDF/DOCX document', async () => {
    const res = await request(app)
      .post('/api/documents')
      .attach('document', 'test.txt');
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message', 'UPLOAD_FAILURE');
  });

  // Test for document extraction
  it('should extract text from the uploaded document', async () => {
    const res = await uploadDocument('test.pdf');
    expect(res).toHaveProperty('text');
  });

  // Test for failed document extraction
  it('should fail to extract text from a non-PDF/DOCX document', async () => {
    try {
      await uploadDocument('test.txt');
    } catch (err) {
      expect(err).toEqual(new Error('Failed to extract text from document'));
    }
  });
});