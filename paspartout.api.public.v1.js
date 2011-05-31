/*
 * Paspartout.com public API wrapper for JavaScript 0.0.2
 *
 * Copyright (c) 2011 Wout Fierens
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
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
      if (o.include.assets === true)
        source += '&include_assets=1';
      else if (o.include.assets === false)
        source += '&include_assets=0';
      
      if (o.include.children === true)
        source += '&include_children=1';
      else if (o.include.children === false)
        source += '&include_children=0';
      
      if (o.include.comments === true)
        source += '&include_comments=1';
      else if (o.include.comments === false)
        source += '&include_comments=0';
    }
    
    if (typeof o.per_page === 'number')
      source += '&per_page=' + o.per_page;
      
    if (typeof o.page === 'number')
      source += '&page=' + o.page;
    
    if (typeof o.order === 'string') {
      source += '&order=' + o.order;
      if (typeof o.way === 'string')
        source += '&way=' + o.way;
    }
    
    if (typeof Paspartout.Cache[source] === 'undefined' || o.force) {
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
            Paspartout.Cache[source] = data;
          }
        } else if (o.failure) {
          o.failure('No data has been returned from the server!');
        }
      };
      
    } else if (o.success) {
      o.success(Paspartout.Cache[source]);
    }
  }
};

Paspartout.Site = {
  load: function(o) {
    o = o || {};
    o.path = '';
    
    if (typeof o.variable === 'undefined')
      o.variable = 'PPSiteData';
    
    Paspartout.Api.Public.load(o);
  }
};

Paspartout.Page = {
  all: function(o) {
    o = o || {};
    o.path = '/pages';
    
    if (typeof o.variable === 'undefined')
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
      
    if (typeof o.variable === 'undefined')
      o.variable = 'PPPageData';
    
    Paspartout.Api.Public.load(o);
  }
};

Paspartout.Comment = {
  all: function(o) {
    o = o || {};
    o.path = o.pageId ? '/pages/' + o.pageId + '/comments' : '/comments';
    
    if (typeof o.variable === 'undefined')
      o.variable = 'PPCommentsData';
    
    Paspartout.Api.Public.load(o);
  }
};

Paspartout.Image = {
  all: function(o) {
    o = o || {};
    o.path = o.pageId ? '/pages/' + o.pageId + '/images' : '/images';
    
    if (typeof o.variable === 'undefined')
      o.variable = 'PPImagesData';
    
    Paspartout.Api.Public.load(o);
  }
};

Paspartout.Cache = {};
