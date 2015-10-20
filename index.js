'use strict';
// internals
var ioc = require('./ioc');
var app = ioc.create('app');
var server = ioc.create('io'); // this modifies express server and returns the *real* server.

app.set('port', process.env.PORT || 8080);
app.set('hostname', process.env.HOSTNAME || '127.0.0.1');

server.listen(app.get('port'), app.get('hostname'), () => {
  console.log('\x1b[36m%s\x1b[0m %s', 'Express server listening on:', 'http://' + server.address().address + ':' + server.address().port + '/');
});
