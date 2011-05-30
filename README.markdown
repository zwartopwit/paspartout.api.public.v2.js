# paspartout.api.public.v1.js

## What is it?
Official JavaScript wrapper for the Paspartout.com public API.

## Who should use it?
Developers or Paspartout site owners who want to create widgets, use public Paspartout data externally or extend behavior.

## Usage

### Installation

Include the file in your page:

    <script src="paspartout.api.public.v1.js" type="text/javascript"></script>

### Configuration

Before you perform any Paspartout related action define the site api id of the site you want to approach:

    Paspartout.config.siteId = 'ppt-123456789';

The site api id can be found under 'settings' > 'advanced'.
Note that the length of the key can vary from site to site.


### Load the Site

    Paspartout.Site.load({
      success: function(site) {
        ... your code ...
      },
      failure: function(error) {
        console.error(error);
      }
    });

The first argument in the success callback includes the following fields:

- title _(meta title)_
- description _(meta description)_
- subdomain _(e.g. subdomain.paspartout.com)_
- host
- url
- icon _(the site icon in all available sizes: apple_touch_icon, favicon, original)_
- page _(the homepage, including its children in case of a portfolio, lookbook, blog, news or shop page)_
- menu _(array with pages and their basic fields: description, id, name, permaname, short_url, title, type, url)_
- footer _(full Paspartout footer info)_


### Load a Page

    Paspartout.Page.load(id, {
      success: function(page) {
        ... your code ...
      },
      failure: function(error) {
        console.error(error);
      }
    });

The first argument in the success callback is an array with all active pages.


### Load all Pages

    Paspartout.Page.all({
      success: function(pages) {
        ... your code ...
      },
      failure: function(error) {
        console.error(error);
      }
    });

The first argument in the success callback is an array with all active pages.


## Important

The Paspartout API is currently in beta.
As the API evolves this library will be updated as well.

This library is framework agnostic.
If any problems arise, please let me know.


## Contributing

* Check out the latest master to make sure the feature hasn't been implemented or the bug hasn't been fixed yet
* Check out the issue tracker to make sure someone already hasn't requested it and/or contributed it
* Fork the project
* Start a feature/bugfix branch
* Commit and push until you are happy with your contribution


## Copyright

Copyright (c) 2011 Wout Fierens. See LICENSE.txt for further details.
