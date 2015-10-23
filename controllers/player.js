'use strict';

var Chance = require('chance');
var chance = new Chance();
var debug = require('debug')('21:player');

exports = module.exports = () => {
  class Player {
    constructor () {
      this.name = chance.name();
      this.ready = false;
      this._cards = [];
    }

    toggleReady () {
      debug(`player ${ this.name } is ready`),
      this.ready = true;
    }

    get cards () {
      return this._cards;
    }

    addCard (card) {
      this.cards.push(card);
    }
  }

  return Player;
};
