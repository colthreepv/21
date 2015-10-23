exports = module.exports = function (io, $log) {
  var self = this;

  self.status = 'loading';

  // defaults
  self.playerNum = 0;
  self.joined = false;
  self.ready = false;
  self.name = '';

  // data received from server, set to null for now
  self.id = null;
  self.players = {};

  function updatePlayers (players) {
    self.players = angular.extend(self.players, players);
    var player;

    // if the actual player is present in the player list, destructure its informations
    if (player = players[self.id], player != null) {
      self.joined = true;
      self.ready = player.ready;
      self.name = player.name;
    } else {
      self.joined = false;
    }
  }

  // on connect, record your personal ID, it will be useful later on
  io.on('connect', function () {
    self.id = this.id;
  });

  io.on('player-id', function (playerStatus) {
    $log.info('player', playerStatus);
    self.id = playerStatus.id;
  });

  io.on('game-status', function (gameStatus) {
    $log.info('game', gameStatus);
    self.status = gameStatus.status;
    self.playersNum = gameStatus.playersNum;
    updatePlayers(gameStatus.players);
  });

  self.join = function () {
    io.emit('join');
  };

  self.toggleReady = function () {
    io.emit('ready');
  };

  self.updateName = function (name) {
    io.emit('change-name', name);
  };

};
exports.$inject = [
  'socket',
  '$log'
];
