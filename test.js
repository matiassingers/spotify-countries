'use strict';

var assert = require('assert');
var fs = require('fs');
var nock = require('nock');

var spotifyCountries = require('./');

var scope = nock('https://www.spotify.com')
  .get('/select-your-country/')
  .replyWithFile(200, __dirname + '/fixtures/response.html');

describe('spotifyCountries', function() {
  var results;
  before(function(done) {
    spotifyCountries(function(data) {
      results = data;

      done();
    });
  });

  it('should return correct amount of countries', function() {
    assert(results.length);
    assert.equal(results.length, 58);
  });

  it('should have correct properties on each country', function() {
    var result = results[16];

    assert.equal(result.title, 'Denmark');
    assert.equal(result.countryCode, 'DK');
    assert.equal(result.url, 'https://www.spotify.com/dk/');
    assert.equal(result.classes, 'flag-icon flag-icon-dk');
    assert.equal(result.country, 'Denmark');
  });
});
