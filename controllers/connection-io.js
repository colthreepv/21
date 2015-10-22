'use strict';
var debug = require('debug')('21:connection');

exports = module.exports = (game) => {
  var gameRoom = game.id; // for now there is only one socket.io room: http://socket.io/docs/rooms-and-namespaces/

  function connection (socket) {
    var io = socket.server; // reference to socket.io
    socket.join(gameRoom); // automatically join the newest socket to the *ONLY* game room

    // send general game status, when something changes
    function gameStatus () {
      io.to(gameRoom).emit('game-status', game.reportStatus());
    }

    // at the initial connection, tell the client which is its own id
    socket.emit('game-status', game.reportStatus()); // informations only to the newly joined client

    // commands that the client can issue
    socket.on('join', () => {
      game.join(socket.id);
      gameStatus();
    });

    socket.on('ready', () => {
      game.ready(socket.id);
      gameStatus();
    });

    socket.on('change-name', name => {
      game.changeName(socket.id, name);
      gameStatus();
    });

    socket.on('disconnect', () => {
      debug(`disconnected ${ socket.id }`);
      game.disconnect(socket.id);
      gameStatus();
    });

  };

  return connection;
};
exports['@require'] = ['controllers/game'];
