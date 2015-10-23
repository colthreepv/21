'use strict';

var debug = require('debug')('21:dealer');

exports = module.exports = (Player) => {
  class Dealer extends Player {
    constructor () {
      super();
      this.name = 'Dealer';
      this.ready = true;
      // dealer has an private array of cards and a public one
      this._privCards = [];
      this._cover = true;
    }

    // each card gets pushed to both arrays
    addCard (card) {
      if (this._cover && this._privCards.length === 1) this.cards.push('covered');
      this.cards.push(card);
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
