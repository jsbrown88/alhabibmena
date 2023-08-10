const assert = require('assert');
const pdfParser = require('../utils/pdfParser');

describe('PDF Parser', function() {
  describe('#extractText()', function() {
    it('should extract text from PDF without error', function(done) {
      pdfParser.extractText('test.pdf', function(err, data) {
        if (err) done(err);
        assert.ok(data);
        done();
      });
    });

    it('should return error for non-PDF files', function(done) {
      pdfParser.extractText('test.docx', function(err, data) {
        assert.ok(err);
        done();
      });
    });

    it('should return error for non-existing files', function(done) {
      pdfParser.extractText('non-existing.pdf', function(err, data) {
        assert.ok(err);
        done();
      });
    });

    it('should return clean text without unnecessary formatting or characters', function(done) {
      pdfParser.extractText('test.pdf', function(err, data) {
        if (err) done(err);
        assert.ok(data);
        assert.equal(data, data.replace(/[^a-zA-Z0-9\s]/g, ''));
        done();
      });
    });
  });
});