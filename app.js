'use strict';
// node
var path = require('path');
// npm
var
  express = require('express'),
  serve = require('serve-static');

exports = module.exports = (controllers) => {
  var app = express();

  // serve static files
  app.get('/*', serve(path.join(__dirname, 'build')));

  return app;
};

exports['@require'] = ['controllers'];
