'use strict';

var through = require('through2');
var jsToSassString = require('./lib/js-to-sass-string');

function jsonSass() {
  return through(function(chunk, enc, callback) {
    var jsValue = JSON.parse(chunk);
    var sassString = jsToSassString(jsValue);
    this.push(sassString);
    callback();
  })
}

module.exports = jsonSass;
exports.jsToSassString = jsToSassString;
