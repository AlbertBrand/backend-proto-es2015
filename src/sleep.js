'use strict';

module.exports = (ms, result) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(result);
    }, ms);
  });
};
