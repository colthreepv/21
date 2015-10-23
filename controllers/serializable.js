'use strict';

exports = module.exports = () => {
  class Serializable {
    toJSON () {
      const jsonified = {};
      for (let key in this) {
        if (key[0] !== '_') jsonified[key] = this[key];
      }
      return jsonified;
    }
  }

  return Serializable;
};
