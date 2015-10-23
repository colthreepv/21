'use strict';

var Chance = require('chance');
var chance = new Chance();
var debug = require('debug')('21:player');

exports = module.exports = (Serializable) => {
  class Player extends Serializable {
    constructor () {
      super();
      this.name = chance.name();
      this.ready = false;
      this.cards = [];
    }

    toggleReady () {
      debug(`player ${ this.name } is ready`),
      this.ready = true;
    }

    addCard (card) {
      this.cards.push(card);
    }
  }

  return Player;
};
exports['@require'] = [
  'controllers/serializable'
];
