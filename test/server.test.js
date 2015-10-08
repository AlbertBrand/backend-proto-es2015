'use strict';

const server = require('../src/server'),
  getBody = require('./getBody'),
  co = require('co'),
  assert = require('assert'),
  port = 6000;

describe('server', () => {
  before(() => {
    server.listen(port);
  });

  describe('/', () => {
    it('should return 200 and respond with okay', (done) => {
      co(function *() {
        const ret = yield getBody(`http://localhost:${port}`);
        assert.equal(200, ret.res.statusCode);
        assert.equal('okay', ret.body);
        done();
      });
    });
  });

  describe('/async', () => {
    it('should return 200 and respond with message', function (done) {
      this.timeout(4000);
      co(function *() {
        const ret = yield getBody(`http://localhost:${port}/async`);
        assert.equal(200, ret.res.statusCode);
        assert.equal('asynchronous result: 123 579', ret.body);
        done();
      });
    });
  });

  describe('/abc', () => {
    it('should return 404', (done) => {
      co(function *() {
        const ret = yield getBody(`http://localhost:${port}/abc`);
        assert.equal(404, ret.res.statusCode);
        assert.equal('not found', ret.body);
        done();
      });
    });
  });

  after(() => {
    server.close();
  });
});
