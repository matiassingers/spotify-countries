#!/usr/bin/env node
'use strict';

var pkg = require('./package.json');
var spotifyCountries = require('./');
var argv = process.argv.slice(2);

var columnify = require('columnify');
var emojiFlags = require('emoji-flags');

function help() {
  console.log([
    '',
      '  ' + pkg.description,
    '',
    '  Example',
    '    spotify-countries',
    '',
    '    =>  🇦🇩  Andorra                         https://www.spotify.com/ad/',
    '        🇦🇷  Argentina                       https://www.spotify.com/ar/',
    '        🇦🇹  Austria                         https://www.spotify.com/at/'
  ].join('\n'));
}

if (argv.indexOf('--help') !== -1) {
  help();
  return;
}

if (argv.indexOf('--version') !== -1) {
  console.log(pkg.version);
  return;
}

function checkmark(data){
  if(!data){
    return '';
  }

  return logSymbols.success;
}

var preserveLocale = argv.indexOf('--preserve-locale') !== -1;
spotifyCountries(function(results){
  console.log(results);

  results.forEach(function(country) {
    country.flag = emojiFlags[country.countryCode].emoji;
  });

  var columnHeaders = ['flag', 'country', 'url'];
  if (preserveLocale) {
    columnHeaders.push('localeTitle');
  }

  var columns = columnify(results, {
    columns: columnHeaders,
    showHeaders: false,
    minWidth: 5
  });

  console.log(columns);
}, preserveLocale);
