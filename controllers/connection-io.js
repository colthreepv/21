'use strict';

exports = module.exports = function (game) {

  function connection (socket) {

    function sendStatus () {
      socket.emit('status', {
        status: game.status,
        players: game.players,
        joined: game.playerIsPresent(socket.id)
      });
    }

    // at the initial connection, broadcast the status
    sendStatus();


    socket.on('join', function (data) {
      game.join(socket.id);
      sendStatus();
    });
  };

  return connection;
};
exports['@require'] = ['controllers/game'];
