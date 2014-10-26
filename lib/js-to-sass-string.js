var _ = require('lodash');

var indentLevel = 0;

function jsToSassString(value) {
  switch (typeof value) {
    case 'boolean':
    case 'number':
      return value.toString();
    case 'string':
      return value;
    case 'object':
      if (_.isPlainObject(value)) {
        indentLevel += 1;
        var indent = indentsToSpaces(indentLevel);

        var jsObj = value;
        var sassKeyValPairs = [];

        for (var key in jsObj) {
          var jsVal = jsObj[key];
          var sassVal = jsToSassString(jsVal);

          if (typeof sassVal !== 'undefined') {
            sassKeyValPairs.push(key + ': ' + sassVal);
          }
        }

        var result = '(\n' + indent + sassKeyValPairs.join(',\n' + indent) + '\n' + indentsToSpaces(indentLevel - 1) + ')';
        indentLevel -= 1;
        return result;
      }
      else if (_.isArray(value)) {
        var sassVals = value.map(jsToSassString).filter(Boolean);
        return '(' + sassVals.join(', ') + ')';
      }
      else if (_.isNull(value)) return 'null';
      else return value.toString();
    default:
      return;
  }
}

function indentsToSpaces(indentCount) {
  return Array(indentCount + 1).join('  ');
} 

module.exports = jsToSassString;
