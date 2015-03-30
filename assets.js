var NodeCache = require('node-cache');
var assetCache = new NodeCache( { stdTTL: 900, checkperiod: 300 } );
require('sugar');

var Entities = require('html-entities').AllHtmlEntities;
var entities = new Entities();

var request = require('sync-request');

function getHTMLResponseBody(cacheKey, path) {
    var cache = assetCache.get(cacheKey);
    if (Object.isEmpty(cache)) {
      var host = 'https://assets.sky.com';
      var html = entities.decode(request('GET', host + path).getBody().toString('utf8'));
      assetCache.set(cacheKey, html);
      cache = assetCache.get(cacheKey);
    }
    return eval("cache." + cacheKey);
}

module.exports = {
  header: function() {
    return getHTMLResponseBody('assetsHeader', '/masthead/mysky/');
  },
  footer: function() {
    return getHTMLResponseBody('assetsFooter', '/footer/');
  },
  styles: function() {
    return getHTMLResponseBody('assetsStyles', '/resources/css/');
  },
  scripts: function() {
    return getHTMLResponseBody('assetsScripts', '/resources/js/');
  }
}

