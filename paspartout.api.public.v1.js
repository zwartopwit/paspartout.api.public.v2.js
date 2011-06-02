/*
 * Paspartout.com public API wrapper for JavaScript 0.0.3
 *
 * Copyright (c) 2011 Wout Fierens
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license
 */
var Paspartout = Paspartout || {
  Api:    {},
  config: {
    url: 'http://api.paspartout.com/public/v1'
  }
};

Paspartout.Api.Public = {
  load: function(o) {
    var self = this, source;
    
    if (typeof Paspartout.config.siteId === 'undefined') {
      if (o.failure)
        o.failure('Paspartout.Config.siteId has not been defined!');
      return false;
    }
    
    source = Paspartout.config.url + '/' + Paspartout.config.siteId + o.path + '.js?variable=' + o.variable;
    
    if (typeof o.include === 'object') {
      for (var k in ['assets','children','comments']) {
        if (o.include[k] === true)
          source += '&include_' + k + '=1';
        else if (o.include[k] === false)
          source += '&include_' + k + '=0';
      };
    }
    
    for (var k in ['per_page','page'])
      if (typeof o[k] === 'number')
        source += '&' + k + '=' + o[k];

    if (typeof o.order === 'string') {
      source += '&order=' + o.order;
      if (typeof o.way === 'string')
        source += '&way=' + o.way;
    }
    
    if (typeof Paspartout.Api.Cache[source] === 'undefined' || o.force) {
      var s = document.createElement('script');
      document.getElementsByTagName('head')[0].appendChild(s);
      s.type = 'text/javascript';
      s.src = source;

      s.onload = function() {
        var data = eval(o.variable);

        if (typeof data === 'object') {
          if (data.error) {
            if (o.failure)
              o.failure(data.error.code + ': ' + data.error.message);
          } else if (o.success) {
            o.success(data);
            Paspartout.Api.Cache[source] = data;
          }
        } else if (o.failure) {
          o.failure('No data has been returned from the server!');
        }
      };
      
    } else if (o.success) {
      o.success(Paspartout.Api.Cache[source]);
    }
  }
};

Paspartout.Api.Site = {
  load: function(o) {
    o = o || {};
    o.path = '';
    o.variable = 'PPSiteData';
    
    Paspartout.Api.Public.load(o);
  }
};

Paspartout.Api.Page = {
  all: function(o) {
    o = o || {};
    o.path = '/pages';
    o.variable = 'PPPagesData';
    
    Paspartout.Api.Public.load(o);
  },
  
  load: function(id, o) {
    var o  = o || {};
    
    if (typeof id === 'undefined') {
      if (o.failure)
        o.failure('No page id given!');
      return false;
    }
    
    o.path = '/pages/' + id;
    o.variable = 'PPPage' + id.toString().replace(/-/g,'_') + 'Data';
    
    Paspartout.Api.Public.load(o);
  }
};

Paspartout.Api.Comment = {
  all: function(o) {
    o = o || {};
    o.path = o.pageId ? '/pages/' + o.pageId + '/comments' : '/comments';
    o.variable = 'PPCommentsData';
    
    Paspartout.Api.Public.load(o);
  }
};

Paspartout.Api.Image = {
  all: function(o) {
    o = o || {};
    o.path = o.pageId ? '/pages/' + o.pageId + '/images' : '/images';
    o.variable = 'PPImagesData';
    
    Paspartout.Api.Public.load(o);
  }
};

Paspartout.Api.Cache = {};
