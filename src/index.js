var angular = require('angular');

var app = angular.module('21', ['btford.socket-io']);

function runFn ($rootScope) {
  console.log('hello 21!');
  $rootScope.pageTitle = '21 | Home page';
}
runFn.$inject = ['$rootScope'];

app.run(runFn);
