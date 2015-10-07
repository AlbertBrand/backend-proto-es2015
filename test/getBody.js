'use strict';

const http = require('http');

module.exports = function getBody(uri, resolve) {
  const bodyChunks = [];
  http.get(uri, (res) => {
    res.on('data', (chunk) => {
      bodyChunks.push(chunk);
    }).on('end', () => {
      const body = bodyChunks.join();
      resolve(res, body);
    });
  });
};
