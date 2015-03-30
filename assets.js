var NodeCache = require('node-cache');
var assetCache = new NodeCache( { stdTTL: 900, checkperiod: 300 } );
require('sugar');

var Entities = require('html-entities').AllHtmlEntities;
var entities = new Entities();

var request = require('sync-request');


function getHTMLResponseBody(cacheKey, url) {
    var cache = assetCache.get(cacheKey);
    if (Object.isEmpty(cache)) {
      var html = entities.decode(request('GET', url).getBody().toString('utf8'));
      assetCache.set(cacheKey, html);
      cache = assetCache.get(cacheKey);
    }
    return eval("cache." + cacheKey);
}

module.exports = {
  header: function() {
    return getHTMLResponseBody('assetsHeader', 'https://assets.sky.com/masthead/mysky/');
  },
  footer: function() {
    return getHTMLResponseBody('assetsFooter', 'https://assets.sky.com/footer/');
  },
  styles: function() {
    return getHTMLResponseBody('assetsStyles', 'https://assets.sky.com/resources/css/');
  },
  scripts: function() {
    return getHTMLResponseBody('assetsScripts', 'https://assets.sky.com/resources/js/');
  }
}

