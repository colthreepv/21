exports = module.exports = function (io, $log) {
  var self = this;

  self.status = 'loading';

  // defaults
  self.players = 0;
  self.joined = false;
  self.ready = false;

  // data received from server, set to null for now
  self.room = null;

  io.on('player-status', function (playerStatus) {
    $log.info(playerStatus);
    self.status = playerStatus.status;
    self.players = playerStatus.players;
    self.joined = playerStatus.joined;
    self.ready = playerStatus.ready;
    self.room = playerStatus.id;
  });

  io.on('game-status', function (gameStatus) {
    self.status = gameStatus.status;
    self.players = gameStatus.players;
  });

  self.join = function () {
    io.emit('join');
  };

  self.toggleReady = function () {
    io.emit('ready');
  };

};
exports.$inject = [
  'socket',
  '$log'
];
