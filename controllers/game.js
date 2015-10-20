'use strict';

class Game {
  constructor () {
    this.status = 'waiting';
    this.players = 0;
    this.playersArray = [];
  }

  join (socketId) {
    if (this.playersArray.indexOf(socketId) !== -1) return console.error(`player: ${ socketId } already in game`);
    if (this.players > 5) return console.error('too many players');
    this.players++;
    this.playersArray.push(socketId);
  }

  playerIsPresent (socketId) {
    return this.playersArray.indexOf(socketId) !== -1;
  }

}

exports = module.exports = function () {
  return new Game();
};
