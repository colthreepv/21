var angular = require('angular');

var app = angular.module('21', ['btford.socket-io']);



app.run(require('./run'));
app.factory('socket', require('./socket-factory'));
app.controller('gameController', require('./game'));
