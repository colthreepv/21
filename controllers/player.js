'use strict';

var Chance = require('chance');
var chance = new Chance();
var debug = require('debug')('21:player');

exports = module.exports = () => {
  class Player {
    constructor (deck) {
      this.name = chance.name();
      this.ready = false;
      this.cards = [];
      this.busted = false;
      this.score = 0;
      this.deck = deck; // reference to deck so Player(s) can interact with it
    }

    toggleReady () {
      debug(`player ${ this.name } is ready`),
      this.ready = true;
    }

    addCard () {
      this.cards.push(this.deck.extract());
      this.countValue();
    }

    countValue () {
      var newValue = this.cards.reduce((prev, current) => prev + current.value, 0);
      if (newValue > 21) { // if the player has busted, convert aces value from 11 to 1
        this.cards.forEach((card) => {
          if (card.value === 11) {
            newValue -= 10;
            card.value = 1;
          }
        });
      }
      if (newValue > 21) {
        this.busted = true;
        this.score = 0;
      } else {
        this.score = newValue;
      }
    }

    hit () {
      this.addCard();
    }
  }

  return Player;
};
