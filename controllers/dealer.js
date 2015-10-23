'use strict';

var debug = require('debug')('21:dealer');

exports = module.exports = (Player) => {
  class Dealer extends Player {
    constructor () {
      super();
      this.name = 'Dealer';
      this.ready = true;
      this._cards = [];
      this._cover = true;
    }

    get cards () {
      return this._cards.map((card, idx) => {
        if (this._cover && idx === 1) return 'covered';
        return card;
      });
    }

    addCard (card) {
      this._cards.push(card);
    }

    uncover () {
      this._cover = false;
    }
  }

  return Dealer;
};
exports['@require'] = [
  'controllers/player'
];
