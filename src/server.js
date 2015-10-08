'use strict';

const http = require('http'),
  co = require('co'),
  sleep = require('./sleep');

const routeHandlers = {
  '/async': (req, res) => {
    co(function *() {
      const a = yield sleep(1000, 123);
      const b = yield sleep(2000, a + 456);
      res.end(`asynchronous result: ${a} ${b}`);

    }).catch(() => {
      res.writeHead(500);
      res.end('internal error');
    });
  },

  '/': (req, res) => {
    res.writeHead(200);
    res.end('okay');
  }
};

const server = http.createServer((req, res) => {
  const handler = routeHandlers[req.url];
  if (handler) {
    return handler(req, res);
  }
  res.writeHead(404);
  res.end('not found');
});

exports.listen = function () {
  server.listen.apply(server, arguments);
};

exports.close = function () {
  server.close.apply(server, arguments);
};
