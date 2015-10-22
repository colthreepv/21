'use strict';

var Chance = require('chance');
var chance = new Chance();
var debug = require('debug')('21:player');

class Player {
  constructor () {
    this.name = chance.name();
    this.ready = false;
    this.cards = [];
  }

  toggleReady () {
    debug(`player ${ this.name } is ready`),
    this.ready = true;
  }

}

module.exports = Player;
