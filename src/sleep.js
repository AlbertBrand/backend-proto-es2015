module.exports = function sleep(ms, result) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(result);
    }, ms);
  });
};
