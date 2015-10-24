exports = module.exports = function (io, $log) {
  var self = this;

  self.status = 'loading';

  // defaults, will be updated with data received from server
  self.playerNum = 0;
  self.joined = false;
  self.ready = false;
  self.name = '';
  self.id = null; // socket.io unique identifier for self
  self.players = {};
  self.dealer = {};
  self.gameTurn = null; // specifies which turn is it

  function updateStatus (gameStatus) {
    $log.info('game', gameStatus);
    self.status = gameStatus.status;
    self.playerNum = gameStatus.playerNum;
    self.gameTurn = gameStatus.gameTurn;
    self.players = gameStatus.players;
    self.dealer = angular.extend(self.dealer, gameStatus.dealer);
    var player;

    // if the actual player is present in the player list, destructure its informations
    if (player = gameStatus.players[self.id], player != null) {
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
  io.on('game-status', updateStatus);

  self.join = function () {
    io.emit('join');
  };

  self.toggleReady = function () {
    io.emit('ready');
  };

  self.updateName = function (name) {
    io.emit('change-name', name);
  };

  // game commands
  self.hit = function () {
    io.emit('hit');
  };

  self.stand = function () {
    io.emit('stand');
  };
};
exports.$inject = [
  'socket',
  '$log'
];
