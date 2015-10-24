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
      Object.defineProperty(this, '_cover', { writable: true, value: true });
    }

    // each card gets pushed to both arrays
    addCard (card) {
      // hide second card
      this._cards.push(card); // private
      if (this._cover && this._cards.length === 2) {
        this.cards.push({
          name: 'covered',
          value: 0
        });
      } else this.cards.push(card); // public
      this.countValue();
    }

    uncover () {
      this._cover = false;
      this.cards[1] = this._cards[1];
      this.countValue();
    }

    play () {
      this.uncover();
      debug('to be implemented :(');
    }
  }

  return Dealer;
};
exports['@require'] = [
  'controllers/player'
];
