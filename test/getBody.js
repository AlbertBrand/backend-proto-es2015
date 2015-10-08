'use strict';

const http = require('http');

module.exports = (uri) => {
  return new Promise((resolve) => {
    const bodyChunks = [];
    http.get(uri, (res) => {
      res.on('data', (chunk) => {
        bodyChunks.push(chunk);
      }).on('end', () => {
        resolve({ res, body: bodyChunks.join() });
      });
    });
  });
};
