'use strict';

var debug = require('debug')('21:dealer');

exports = module.exports = (Player) => {


  class Dealer extends Player {
    constructor (deck, players) {
      super(deck);
      this.name = 'Dealer';
      this.ready = true;
      // dealer has an private array of cards and a public one
      Object.defineProperty(this, '_cards', { value: [] });
      Object.defineProperty(this, '_cover', { writable: true, value: true });
      Object.defineProperty(this, 'players', { value: players });
    }

    // each card gets pushed to both arrays
    addCard () {
      const card = this.deck.extract();
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

    lowerScoreThanMe () {
      return Object.keys(this.players).reduce((prev, current) => {
        if (this.players[current].score < this.score) return prev++;
      }, 0);
    }

    play () {
      this.uncover();
      const halfPlayers = (Object.keys(this.players).length / 2) | 0;
      const playersWithLessScore = this.lowerScoreThanMe();
      // if has an higher score than half the players, Dealer stays
      if (playersWithLessScore < halfPlayers) {
        this.hit();
        if (!this.busted) this.play(); // if has not busted yet, do again
      }
      else return;
    }
  }

  return Dealer;
};
exports['@require'] = [
  'controllers/player'
];
