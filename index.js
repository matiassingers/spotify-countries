'use strict';

var osmosis = require('osmosis');
var isoCountries = require('country-list')();
var uniq = require('lodash.uniq');
var sortBy = require('lodash.sortby');

module.exports = function(callback, preserveLocale){
  var countries = [];

  osmosis
    .get('https://www.spotify.com/select-your-country/')
    .find('.country-list .country-item .country-link')
    .set({
      title: '@title',
      countryCode: '@rel',
      url: '@href',
      classes: 'span @class'
    })
    .then(function(context, data, next){
      data.url = 'https://www.spotify.com' + data.url;

      data.countryCode = data.countryCode.toUpperCase();

      if (preserveLocale) {
        data.countryLocaleCode = data.countryCode;
        data.localeTitle = data.title;
      }

      data.countryCode = data.countryCode.split('-')[0] || data.countryCode;

      // Handle United Kingdom exceptional reservation: http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Exceptional_reservations
      if (data.countryCode === 'UK') {
        data.countryCode = 'GB';
      }

      // Strip locale from country title
      var bracketIndex = data.title.indexOf('(');
      if (bracketIndex !== -1) {
        data.title = data.title.substring(0, bracketIndex - 1);
      }

      data.country = isoCountries.getName(data.countryCode);

      next(context, data);
    })
    .data(function(country){
      countries.push(country);
    })
    .done(function(){
      if (!preserveLocale) {
        countries = uniq(countries, 'countryCode');
      }

      callback(sortBy(countries, 'countryCode'));
    });
};
