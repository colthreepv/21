'use strict';

var shortid = require('shortid');
var debug = require('debug')('game');

class Game {
  constructor () {
    this.id = shortid();
    this.status = 'waiting';
    this.players = 0;
    this.playersArray = [];
    this.playersReady = [];
  }

  join (socketId) {
    if (this.playersArray.indexOf(socketId) !== -1) return console.error(`player: ${ socketId } already in game`);
    if (this.players > 5) return console.error('too many players');
    this.players++;
    this.playersArray.push(socketId);
  }

  disconnect (socketId) {
    var arrayPos;
    // remove player if present
    if (arrayPos = this.playersArray.indexOf(socketId), arrayPos !== -1) {
      this.playersArray.splice(arrayPos, 1);
      this.players--;
      debug(`removed player ${ socketId }`);
    }
  }

  playerIsPresent (socketId) {
    return this.playersArray.indexOf(socketId) !== -1;
  }

  ready (socketId) {
    if (this.playersArray.indexOf(socketId) === -1) return console.error(`player: ${ socketId } asked ready but is not in game`);
    debug(`received valid ready from ${ socketId }`);
    this.playersReady.push(socketId);
  }

  playerStatus (socketId) {
    return {
      status: this.status,
      players: this.players,
      joined: (this.playersArray.indexOf(socketId) !== -1),
      ready: (this.playersReady.indexOf(socketId) !== -1)
    };
  }

  reportStatus () {
    return {
      status: this.status,
      players: this.players
    };
  }

}

exports = module.exports = function () {
  return new Game();
};
