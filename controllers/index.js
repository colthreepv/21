'use strict';

var ioc = require('../ioc');

function joinPath (filename) {
  return 'controllers/' + filename;
}

exports.connectionIo = ioc.create(joinPath('connection-io'));
