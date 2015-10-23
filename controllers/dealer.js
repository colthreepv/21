'use strict';

var debug = require('debug')('21:dealer');

exports = module.exports = (Player) => {
  class Dealer extends Player {
    constructor () {
      super();
      this.name = 'Dealer';
      this.ready = true;
      // dealer has an private array of cards and a public one
      Object.defineProperty(this, '_cards', { value: [] });
      Object.defineProperty(this, '_cover', { writeble: true, value: 'true' });
    }

    // each card gets pushed to both arrays
    addCard (card) {
      if (this._cover && this._cards.length === 1) this.cards.push('covered');
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
