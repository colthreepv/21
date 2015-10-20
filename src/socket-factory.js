exports = module.exports = function (socketFactory) {
  return socketFactory();
};
exports.$inject = ['socketFactory'];
