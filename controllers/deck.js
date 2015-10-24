'use strict';

var shuffle = require('knuth-shuffle').knuthShuffle;

const deck = {
  'ace-of-clubs': 11,
  'two-of-clubs': 2,
  'three-of-clubs': 3,
  'four-of-clubs': 4,
  'five-of-clubs': 5,
  'six-of-clubs': 6,
  'seven-of-clubs': 7,
  'eight-of-clubs': 8,
  'nine-of-clubs': 9,
  'ten-of-clubs': 10,
  'jack-of-clubs': 10,
  'queen-of-clubs': 10,
  'king-of-clubs': 10,
  'ace-of-spades': 11,
  'two-of-spades': 2,
  'three-of-spades': 3,
  'four-of-spades': 4,
  'five-of-spades': 5,
  'six-of-spades': 6,
  'seven-of-spades': 7,
  'eight-of-spades': 8,
  'nine-of-spades': 9,
  'ten-of-spades': 10,
  'jack-of-spades': 10,
  'queen-of-spades': 10,
  'king-of-spades': 10,
  'ace-of-hearts': 11,
  'two-of-hearts': 2,
  'three-of-hearts': 3,
  'four-of-hearts': 4,
  'five-of-hearts': 5,
  'six-of-hearts': 6,
  'seven-of-hearts': 7,
  'eight-of-hearts': 8,
  'nine-of-hearts': 9,
  'ten-of-hearts': 10,
  'jack-of-hearts': 10,
  'queen-of-hearts': 10,
  'king-of-hearts': 10,
  'ace-of-diamonds': 11,
  'two-of-diamonds': 2,
  'three-of-diamonds': 3,
  'four-of-diamonds': 4,
  'five-of-diamonds': 5,
  'six-of-diamonds': 6,
  'seven-of-diamonds': 7,
  'eight-of-diamonds': 8,
  'nine-of-diamonds': 9,
  'ten-of-diamonds': 10,
  'jack-of-diamonds': 10,
  'queen-of-diamonds': 10,
  'king-of-diamonds': 10
};

exports = module.exports = () => {
  class Deck {
    constructor () {
      this.cards = 52;
      this.info = deck;
      this.cardsAvailable = [];
      for (var i in deck) {
        this.cardsAvailable.push({
          name: i,
          value: deck[i]
        });
      }
    }

    shuffle () {
      shuffle(this.cardsAvailable); // modifies original Array
    }

    extract () {
      return this.cardsAvailable.pop();
    }
  }

  return Deck;
};
