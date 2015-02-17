'use strict';

import 'babel/polyfill';
import through from 'through2';
import jsToSassString from './jsToSassString';

let DEFAULTS = {
  prefix: '',
  suffix: ';',
};

function jsonSass(options) {
  let options = Object.assign({}, DEFAULTS, options);

  return through(function(chunk, enc, callback) {
    let jsValue = JSON.parse(chunk);
    let sassString = jsToSassString(jsValue);
    sassString = options.prefix + sassString + options.suffix;
    this.push(sassString);
    callback();
  });
}

export default jsonSass;
export { jsToSassString as convertJs };
