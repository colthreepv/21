exports = module.exports = function (io) {
  var self = this;

  self.message = 'loading...';

  io.on('welcome', function (data) {
    self.message = data.hello;
  });
};
exports.$inject = ['socket'];
