'use strict';

var
  ioc = require('../ioc'),
  fs = require('fs'),
  path = require('path'),
  iocPath = path.join(__dirname, '..');

function walk (dir) {
  var currentDir = {};
  fs.readdirSync(dir)
  .filter(function blacklist (file) {
    return !/.md|index|_|\.spec.js/.test(file);
  }).forEach(function (file) {
    var
      filePath = path.join(dir, file),
      stat = fs.statSync(filePath);

    var exportName = path.basename(file, '.js').replace(/-([a-z])/g, function (g) {
      return g[1].toUpperCase();
    });

    // in case is a dir, recurse
    if (stat.isDirectory()) {
      currentDir[exportName] = walk(filePath);
    } else {
      // console.log(path.relative(iocPath, filePath));
      currentDir[exportName] = ioc.create(path.relative(iocPath, filePath));
    }
  });
  return currentDir;
}

module.exports = walk(__dirname);
