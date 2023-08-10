const request = require('supertest');
const app = require('../server');
const vectorController = require('../controllers/vectorController');

describe('Vector Controller', () => {
  it('should have a vectorizeText function', () => {
    expect(typeof vectorController.vectorizeText).toBe('function');
  });

  it('should return a status code 200 when vectorization is successful', async () => {
    const res = await request(app)
      .post('/api/vectorize')
      .send({
        text: 'This is a sample text for vectorization.'
      });
    expect(res.statusCode).toEqual(200);
  });

  it('should return a status code 400 when vectorization fails', async () => {
    const res = await request(app)
      .post('/api/vectorize')
      .send({
        text: ''
      });
    expect(res.statusCode).toEqual(400);
  });

  it('should return a vector when vectorization is successful', async () => {
    const res = await request(app)
      .post('/api/vectorize')
      .send({
        text: 'This is a sample text for vectorization.'
      });
    expect(res.body).toHaveProperty('vector');
  });
});