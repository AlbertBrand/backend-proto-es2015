'use strict';

const http = require('http');

module.exports = (uri, resolve) => {
  const bodyChunks = [];
  http.get(uri, (res) => {
    res.on('data', (chunk) => {
      bodyChunks.push(chunk);
    }).on('end', () => {
      resolve(res, bodyChunks.join());
    });
  });
};
