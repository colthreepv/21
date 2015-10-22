exports = module.exports = function (io, $log) {
  var self = this;

  self.status = 'loading';

  // defaults
  self.players = 0;
  self.joined = false;
  self.ready = false;
  self.name = '';

  // data received from server, set to null for now
  self.id = null;
  self.player = {};
  self.pData = {};

  function updatePlayers (pData) {
    self.pData = angular.extend(self.pData, pData);

    // if the actual player is present in the player list, destructure its informations
    if (pData[self.id]) {
      self.joined = true;
      self.ready = pData[self.id].ready;
      angular.extend(self.player, pData[self.id]);
      self.name = pData[self.id].name;
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
    self.players = gameStatus.players;
    updatePlayers(gameStatus.pData);
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
