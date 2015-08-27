'use strict';

import { expect } from 'chai';
import jsToSassString from '../jsToSassString';

function Foo() {
  this.toString = function() {
    return 'bar';
  }
}

var foo = new Foo();

describe('JS to Sass', function() {
  it('should handle strings', function() {
    expect(jsToSassString('foo')).to.equal('"foo"');
  });

  it('should handle booleans', function() {
    expect(jsToSassString(true)).to.equal('true');
    expect(jsToSassString(false)).to.equal('false');
  });

  it('should handle null', function() {
    expect(jsToSassString(null)).to.equal('null');
  });

  it('should ignore undefined', function() {
    expect(jsToSassString(undefined)).to.be.undefined;
  });

  it('should ignore functions', function() {
    expect(jsToSassString(function() {})).to.be.undefined;
  });

  it ('should use value of `.toString()` for non-plain objects', function() {
    expect(jsToSassString(foo)).to.equal('bar');
  });

  it('should convert arrays to lists', function() {
    expect(jsToSassString([1, 2, 3])).to.equal('(1, 2, 3)');
  });

  it('should convert objects to maps, with indentation', function() {
    var obj = {
      foo: 'bar',
      bar: {
        baz: 'foo',
      },
    };

    expect(jsToSassString(obj)).to.equal('(\n  "foo": "bar",\n  "bar": (\n    "baz": "foo"\n  )\n)')
  })
});
