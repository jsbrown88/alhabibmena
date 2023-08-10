const request = require('supertest');
const app = require('../server');
const { translateText } = require('../controllers/gpt4Controller');

describe('GPT-4 Controller', () => {
  it('should have a translateText function', () => {
    expect(typeof translateText).toBe('function');
  });

  it('should call OpenAI API for translation', async () => {
    const req = { body: { text: 'Dental jargon' } };
    const res = { json: jest.fn() };

    await translateText(req, res);

    expect(res.json).toBeCalledWith(expect.objectContaining({
      translatedText: expect.any(String)
    }));
  });

  it('should handle errors', async () => {
    const req = { body: { text: 'Dental jargon' } };
    const res = { json: jest.fn(), status: jest.fn() };

    await translateText(req, res);

    expect(res.status).toBeCalledWith(500);
    expect(res.json).toBeCalledWith(expect.objectContaining({
      error: expect.any(String)
    }));
  });

  it('should POST /api/translate', async () => {
    const response = await request(app)
      .post('/api/translate')
      .send({ text: 'Dental jargon' });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('translatedText');
  });
});