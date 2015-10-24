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
      Object.defineProperty(this, '_cover', { writeble: true, value: true });
    }

    // each card gets pushed to both arrays
    addCard (card) {
      // hide second card
      if (this._cover && this._cards.length === 1) return this.cards.push('covered');
      this.cards.push(card); // public
      this._cards.push(card); // private
    }

    uncover () {
      this._cover = false;
      this._cards[1] = this.cards[1];
    }
  }

  return Dealer;
};
exports['@require'] = [
  'controllers/player'
];
