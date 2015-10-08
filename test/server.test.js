'use strict';

const server = require('../src/server'),
  getBody = require('./getBody'),
  assert = require('assert'),
  port = 6000;

describe('server', () => {
  before(() => {
    server.listen(port);
  });

  describe('/', () => {
    it('should return 200 and respond with okay', (done) => {
      getBody(`http://localhost:${port}`, (res, body) => {
        assert.equal(200, res.statusCode);
        assert.equal('okay', body);
        done();
      });
    });
  });

  describe('/async', () => {
    it('should return 200 and respond with message', function (done) {
      this.timeout(4000);
      getBody(`http://localhost:${port}/async`, (res, body) => {
        assert.equal(200, res.statusCode);
        assert.equal('asynchronous result: 123 579', body);
        done();
      });
    });
  });

  describe('/abc', () => {
    it('should return 404', (done) => {
      getBody(`http://localhost:${port}/abc`, (res, body) => {
        assert.equal(404, res.statusCode);
        assert.equal('not found', body);
        done();
      });
    });
  });

  after(() => {
    server.close();
  });
});
