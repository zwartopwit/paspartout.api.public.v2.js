/*
 * Paspartout.com public API wrapper for JavaScript 0.0.5
 *
 * Copyright (c) 2011 Wout Fierens
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license
 */
var Paspartout = Paspartout || {
  Api:    {},
  config: {
    url: (function() {
      return (document.location.protocol == 'https:' ? 'https://secure' : 'http://api') + '.paspartout.com/public/v1';
    })()
  }
};

Paspartout.Api.Public = {
  load: function(o) {
    var source, cacheKey, list,
        start = new Date();
    
    if (typeof Paspartout.config.siteId === 'undefined') {
      if (o.failure)
        o.failure('Paspartout.Config.siteId has not been defined!');
      return false;
    }
    
    source = Paspartout.config.url + '/' + Paspartout.config.siteId + o.path + '.js?callback=Paspartout.Api.Public.onload';
    
    if (typeof o.include === 'object') {
      list = ['assets','children','comments'];
      for (var i = list.length - 1; i >= 0; i--) {
        if (o.include[list[i]] === true)
          source += '&include_' + list[i] + '=1';
        else if (o.include[list[i]] === false)
          source += '&include_' + list[i] + '=0';
      };
    }

    list = ['per_page','page'];
    for (var i = list.length - 1; i >= 0; i--)
      if (typeof o[list[i]] === 'number')
        source += '&' + list[i] + '=' + o[list[i]];

    if (typeof o.order === 'string') {
      source += '&order=' + o.order;
      if (typeof o.way === 'string')
        source += '&way=' + o.way;
    }
    
    if (o.cache === false)
      source += '&random=' + Math.random();
    
    cacheKey = source.toLowerCase().replace(/:|\/|\.|\-|=|&|\?/g, '_').replace(/_{2,}/, '_');
    
    if (typeof Paspartout.Api.Cache[cacheKey] === 'undefined' || o.cache === false) {
      var load, s = document.createElement('script');
      document.getElementsByTagName('head')[0].appendChild(s);
      s.type  = 'text/javascript';
      s.async = true;
      s.src   = source;
      
      this.onload = function(data) {
        if (typeof data === 'object') {
          if (data.error) {
            if (o.failure)
              o.failure(data.error.code + ': ' + data.error.message);
          } else if (o.success) {
            data._request = { time: new Date() - start, cached: false };
            o.success(data);
            Paspartout.Api.Cache[cacheKey] = data;
          }
        } else if (o.failure) {
          o.failure('No data has been returned from the server!');
        }
      };
      
    } else if (o.success) {
      var data = Paspartout.Api.Cache[cacheKey];
      data._request = { time: new Date() - start, cached: true };
      o.success(data);
    }
  }
};

Paspartout.Api.Site = {
  load: function(o) {
    o = o || {};
    o.path = '';
    Paspartout.Api.Public.load(o);
  }
};

Paspartout.Api.Page = {
  all: function(o) {
    o = o || {};
    o.path = '/pages';
    Paspartout.Api.Public.load(o);
  },

  load: function(id, o) {
    var o = o || {};
    
    if (typeof id === 'undefined' || typeof id === 'object') {
      if (o.failure)
        o.failure('No valid page id given!');
      return false;
    }

    o.path = '/pages/' + id;
    Paspartout.Api.Public.load(o);
  }
};

Paspartout.Api.Comment = {
  all: function(o) {
    o = o || {};
    o.path = o.pageId ? '/pages/' + o.pageId + '/comments' : '/comments';
    Paspartout.Api.Public.load(o);
  }
};

Paspartout.Api.Image = {
  all: function(o) {
    o = o || {};
    o.path = o.pageId ? '/pages/' + o.pageId + '/images' : '/images';
    Paspartout.Api.Public.load(o);
  }
};

Paspartout.Api.Cache = {};