'use strict';

// initialize electrolyte and uses node require() cache to act as singleton
var ioc = require('electrolyte');
ioc.use(ioc.node(__dirname));
module.exports = ioc;
