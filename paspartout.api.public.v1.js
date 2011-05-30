/*
 * Paspartout.com public API wrapper for JavaScript 0.0.1
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
  load: function(options) {
    var self = this, source;
    
    if (typeof Paspartout.config.siteId === 'undefined') {
      if (options.failure)
        options.failure('Paspartout.Config.siteId has not been defined!');
      return false;
    }
    
    source = Paspartout.config.url + '/' + Paspartout.config.siteId + options.path + '.js?variable=' + options.variable;
    
    if (options.includeAssets === true)
      source += '&include_assets=1';
    
    if (options.includeChildren === true)
      source += '&include_children=1';
    
    if (options.includeComments === true)
      source += '&include_comments=1';
    
    if (typeof Paspartout.Cache[source] === 'undefined' || options.force) {
      var script = document.createElement('script');
      document.getElementsByTagName('head')[0].appendChild(script);
      script.type = 'text/javascript';
      script.src = source;

      script.onload = function() {
        var data = eval(options.variable);

        if (typeof data === 'object') {
          if (data.error) {
            if (options.failure)
              options.failure(data.error.code + ': ' + data.error.message);
          } else if (options.success) {
            options.success(data);
            Paspartout.Cache[source] = data;
          }
        } else if (options.failure) {
          options.failure('No data has been returned from the server!');
        }
      };
      
    } else if (options.success) {
      options.success(Paspartout.Cache[source]);
    }
  }
};

Paspartout.Site = {
  load: function(options) {
    options = options || {};
    options.path = '';
    
    if (typeof options.variable === 'undefined')
      options.variable = 'PPSiteData';
    
    Paspartout.Api.Public.load(options);
  }
};

Paspartout.Page = {
  all: function(options) {
    options = options || {};
    options.path = '/pages';
    
    if (typeof options.variable === 'undefined')
      options.variable = 'PPPagesData';
    
    Paspartout.Api.Public.load(options);
  },
  
  load: function(id, options) {
    var options  = options || {};
    
    if (typeof id === 'undefined') {
      if (options.failure)
        options.failure('No page id given!');
      return false;
    }
    
    options.path = '/pages/' + id;
      
    if (typeof options.variable === 'undefined')
      options.variable = 'PPPageData';
    
    Paspartout.Api.Public.load(options);
  }
};

Paspartout.Comment = {
  all: function(options) {
    options = options || {};
    if (typeof options.pageId === 'undefined')
      options.path = '/comments';
    else
      options.path = '/pages/' + options.pageId + '/comments';
    
    if (typeof options.variable === 'undefined')
      options.variable = 'PPCommentsData';
    
    Paspartout.Api.Public.load(options);
  }
};

Paspartout.Cache = {};
