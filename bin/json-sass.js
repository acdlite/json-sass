#!/usr/bin/env node

var jsonSass = require('../');
var fs = require('fs');
var path = require('path');
var minimist = require('minimist');

var argv = minimist(process.argv.slice(2), {
    alias: {
      i: 'infile',
      o: 'outfile',
      h: 'help',
      p: 'prefix',
      s: 'suffix',
    },
    default: { i: '-', o: '-' }
});

if (argv.help) return showHelp(0);

var input = argv.infile === '-'
  ? process.stdin
  : fs.createReadStream(argv.infile);

var output = argv.outfile === '-'
  ? process.stdout
  : fs.createWriteStream(argv.outfile);

var opts = {};

if (argv.prefix) opts.prefix = argv.prefix;
if (argv.suffix) opts.suffix = argv.suffix;

input.pipe(jsonSass(opts)).pipe(output);

function showHelp(code) {
  var r = fs.createReadStream(path.join(__dirname, 'usage.txt'));
  r.on('end', function () {
    if (code) process.exit(code);
  });
  r.pipe(process.stdout);
}
