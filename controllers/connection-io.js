'use strict';

exports = module.exports = function () {
  function connection (socket) {
    socket.emit('welcome', { hello: 'world' });
  };

  return connection;
};
