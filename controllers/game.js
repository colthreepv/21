'use strict';

// npm
var shortid = require('shortid');
var debug = require('debug')('21:game');

// internals
var Player = require('./player');

class Game {
  constructor () {
    this.id = shortid();
    this.status = 'waiting';
    this.players = 0;
    // information is redundant, arrays are for finding and hash is for storing data
    this.playersArray = [];
    this.playersReady = [];
    this.playerData = {};
  }

  join (socketId) {
    if (this.playersArray.indexOf(socketId) !== -1) return console.error(`player: ${ socketId } already in game`);
    if (this.players > 5) return console.error('too many players');
    this.players++;
    this.playersArray.push(socketId);
    this.playerData[socketId] = new Player();
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
    this.playerData[socketId].toggleReady();
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
      players: this.players,
      data: this.playerData
    };
  }

}

exports = module.exports = function () {
  return new Game();
};
