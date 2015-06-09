# spotify-countries [![Build Status](http://img.shields.io/travis/matiassingers/spotify-countries.svg?style=flat-square)](https://travis-ci.org/matiassingers/spotify-countries) [![Dependency Status](http://img.shields.io/gemnasium/matiassingers/spotify-countries.svg?style=flat-square)](https://gemnasium.com/matiassingers/spotify-countries)
> list of countries that Spotify is available in


## Install

```sh
$ npm install --save spotify-countries
```


## Usage

```js
var spotifyCountries = require('spotify-countries');

spotifyCountries(function(countries){
  console.log(countries);
  // => [ { title: 'Andorra', countryCode: 'AD', url: 'https://www.spotify.com/ad/', ...
});
```


## CLI

```sh
$ npm install --global spotify-countries
```

```sh
$ spotify-countries --help

  list of countries that Spotify is available in

  Example
    spotify-countries

    =>  🇦🇩  Andorra                         https://www.spotify.com/ad/
        🇦🇷  Argentina                       https://www.spotify.com/ar/
        🇦🇹  Austria                         https://www.spotify.com/at/
    
```


## License

MIT © [Matias Singers](http://mts.io)
