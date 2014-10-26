'use strict';

var through = require('through2');
var jsToSassString = require('./lib/js-to-sass-string');
var _ = require('lodash');

var DEFAULTS = {
  prefix: '',
  suffix: ';',
};

function jsonSass(options) {
  options = _.merge({}, DEFAULTS, options);

  return through(function(chunk, enc, callback) {
    var jsValue = JSON.parse(chunk);
    var sassString = jsToSassString(jsValue);
    sassString = options.prefix + sassString + options.suffix;
    this.push(sassString);
    callback();
  })
}

exports = module.exports = jsonSass;
exports.convertJs = jsToSassString;
