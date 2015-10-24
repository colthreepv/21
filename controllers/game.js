'use strict';

// npm
var shortid = require('shortid');
var debug = require('debug')('21:game');

// internals
exports = module.exports = (Player, Dealer, Deck) => {
  class Game {
    constructor () {
      this.id = shortid();
      this.status = 'waiting';
      this.playersNum = 0;
      // information is redundant, arrays are for finding and hash is for storing data
      this.gameTurn = null;
      this.currentPlayer = 0;
      this.playersArray = [];
      this.playersReady = [];
      this.players = {}; // players data
      this.deck = new Deck();
      this.dealer = new Dealer();
    }

    join (socketId) {
      if (this.playersArray.indexOf(socketId) !== -1) return console.error(`player: ${ socketId } already in game`);
      if (this.playersNum > 5) return console.error('too many players');
      this.playersNum++;
      this.playersArray.push(socketId);
      this.players[socketId] = new Player();
    }

    disconnect (socketId) {
      var arrayPos;
      // remove player if present
      if (arrayPos = this.playersArray.indexOf(socketId), arrayPos !== -1) {
        this.playersArray.splice(arrayPos, 1);
        this.playersNum--;
        delete this.players[socketId];
        debug(`removed player ${ socketId }`);
      }
      // also remove from ready players, if that was the case
      if (arrayPos = this.playersReady.indexOf(socketId), arrayPos !== -1) this.playersReady.splice(arrayPos, 1);
    }

    changeName (socketId, name) {
      if (this.status !== 'waiting') return; // cannot change name during match
      this.players[socketId].name = name;
    }

    ready (socketId) {
      if (this.playersArray.indexOf(socketId) === -1) return console.error(`player: ${ socketId } asked ready but is not in game`);
      debug(`received valid ready from ${ socketId }`);
      this.playersReady.push(socketId);
      this.players[socketId].toggleReady();

      if (this.playersArray.length === this.playersReady.length) this.start();
    }

    reportStatus () {
      return {
        status: this.status,
        playersNum: this.playersNum,
        players: this.players,
        dealer: this.dealer,
        gameTurn: this.gameTurn
      };
    }

    deal () {
      this.deck.shuffle(); // everyday I'm shufflin https://www.youtube.com/watch?v=KQ6zr6kCPj8
      // for each player deal 2 cards
      Object.keys(this.players).forEach((playerId) => {
        const card1 = this.deck.extract();
        const card2 = this.deck.extract();
        this.players[playerId].addCard(card1);
        this.players[playerId].addCard(card2);
      });
      // give 2 cards to the dealer as well
      this.dealer.addCard(this.deck.extract());
      this.dealer.addCard(this.deck.extract());
    }

    // assign the turn to a player
    turn () {
      this.gameTurn = this.playersArray[this.currentPlayer];
    }

    hit (socketId) { // player hits
      this.players[socketId].addCard(this.deck.extract());
      // FIXME: if card value is too high, make the player bust
    }

    stand () { // player stands
      this.turn();
    }

    start () {
      this.status = 'match';
      this.deal();
      this.turn();
    }
  }

  return Game;
};
exports['@require'] = [
  'controllers/player',
  'controllers/dealer',
  'controllers/deck'
];
