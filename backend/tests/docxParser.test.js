const assert = require('assert');
const docxParser = require('../utils/docxParser');

describe('DOCX Parser', function() {
  describe('#extractText()', function() {
    it('should extract text from DOCX file without error', function(done) {
      docxParser.extractText('test.docx', function(err, text) {
        if (err) done(err);
        assert.ok(text);
        done();
      });
    });

    it('should return error for non-DOCX files', function(done) {
      docxParser.extractText('test.pdf', function(err, text) {
        assert.ok(err);
        assert.equal(text, undefined);
        done();
      });
    });

    it('should return error for non-existing files', function(done) {
      docxParser.extractText('non-existing.docx', function(err, text) {
        assert.ok(err);
        assert.equal(text, undefined);
        done();
      });
    });
  });
});