'use strict';
// node
var path = require('path');
// npm
var
  express = require('express'),
  serve = require('serve-static');


exports = module.exports = (controllers) => {
  var app = express();
  app.get('/', serve(path.join(__dirname, 'html')));

  return app;
};

exports['@require'] = ['controllers'];
