exports = module.exports = function (io) {
  var self = this;

  self.status = 'loading';
  self.players = 0;
  self.joined = false;

  io.on('status', function (data) {
    self.status = data.status;
    self.players = data.players;
    self.joined = data.joined;
  });

  self.join = function () {
    io.emit('join');
  };

};
exports.$inject = ['socket'];
