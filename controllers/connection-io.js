'use strict';
var debug = require('debug')('21:connection');

exports = module.exports = function (game) {
  var gameRoom = game.id; // for now there is only one socket.io room: http://socket.io/docs/rooms-and-namespaces/

  // send the client its status
  function playerStatus (socket) {
    socket.emit('player-status', game.playerStatus(socket.id));
  }

  function connection (socket) {
    var io = socket.server; // reference to socket.io
    socket.join(gameRoom); // automatically join the newest socket to the *ONLY* game room

    // send general game status, when something changes
    function gameStatus () {
      io.to(gameRoom).emit('game-status', game.reportStatus());
    }

    // at the initial connection, broadcast the status
    playerStatus(socket);

    // commands that the client can issue
    socket.on('join', function () {
      game.join(socket.id);
      playerStatus(socket);
      gameStatus();
    });

    socket.on('ready', function () {
      game.ready(socket.id);
      playerStatus(socket);
      gameStatus();
    });

    socket.on('disconnect', function () {
      debug(`disconnected ${ socket.id }`);
      game.disconnect(socket.id);
      gameStatus();
    });

  };

  return connection;
};
exports['@require'] = ['controllers/game'];
