'use strict';

import through from 'through2';
import jsToSassString from './jsToSassString';
import assign from 'object-assign';

let DEFAULTS = {
  prefix: '',
  suffix: ';',
};

function jsonSass(options) {
  let options = assign({}, DEFAULTS, options);

  return through(function(chunk, enc, callback) {
    let jsValue = JSON.parse(chunk);
    let sassString = jsToSassString(jsValue);
    sassString = options.prefix + sassString + options.suffix;
    this.push(sassString);
    callback();
  });
}

//
// Cover all require use cases.
//
jsonSass.convertJs = jsToSassString;
module.exports = jsonSass;

export default jsonSass;
export { jsToSassString as convertJs };
