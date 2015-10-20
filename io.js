'use strict';

// node
var http = require('http');
// npm
var socketIo = require('socket.io');

// this module exports an HTTP server instead of IO, it might be a little misleading!
exports = module.exports = (app, controllers) => {
  var server = new http.Server(app);
  var io = socketIo(server);

  io.on('connection', controllers.connectionIo);

  return server;
};
exports['@require'] = ['app', 'controllers'];
