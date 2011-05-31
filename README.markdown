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

The object passed as the first argument in the success callback the site object including the following fields:

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

    Paspartout.Page.load(page_id_or_permaname, {
      success: function(page) {
        ... your code ...
      },
      failure: function(error) {
        console.error(error);
      }
    });

The object passed as the first argument in the success callback the page object including the following (possible) fields:

- type
- id
- name
- title
- permaname
- url
- short_url
- created_at
- updated_at
- body
- body_position
- published_at
- allow_comments
- number_of_comments
- categories
- keywords
- comments
- blocks
- children
- price
- big_shipment
- sold
- promotion_id
- thumb
- categories
- collections
- genders
- materials
- keywords
- variations
- images

The field sets vary for each page type.


### Load Pages

    Paspartout.Page.all({
      success: function(pages) {
        ... your code ...
      },
      failure: function(error) {
        console.error(error);
      }
    });

The first argument in the success callback is an array with all active pages.


### Load Comments

    Paspartout.Comment.all({
      success: function(comments) {
        ... your code ...
      },
      failure: function(error) {
        console.error(error);
      }
    });

The first argument in the success callback is an array with approved comments.

Optionally you can provide the 'pageId' option to scope comments to a given page:

    Paspartout.Comment.all({
      pageId: page_id_or_permaname,
      
      success: function(comments) {
        ... your code ...
      },
      failure: function(error) {
        console.error(error);
      }
    });

By default a basic page object is included for each comment.


### Load Comments

    Paspartout.Image.all({
      success: function(comments) {
        ... your code ...
      },
      failure: function(error) {
        console.error(error);
      }
    });

The first argument in the success callback is an array with images.

Like comments you can optionally provide the 'pageId' option to scope images to a given page:

    Paspartout.Comment.all({
      pageId: page_id_or_permaname,
      
      success: function(comments) {
        ... your code ...
      },
      failure: function(error) {
        console.error(error);
      }
    });


### Include or exclude

When loading a portfolio page for example its children (the projects) are included by default.
You can prevent that bypassing the following option:

    Paspartout.Page.load(page_id_or_permaname, {
      include: {
        children: false
      },
      
      success...
    });

When loading a blog post the comments are not included.
To include them:

    Paspartout.Page.load(page_id_or_permaname, {
      include: {
        comments: true
      },
      
      success...
    });

This also works when loading a blog page.
the comments for every post will then be included.


### Other options

Other options are:

- order _(the position order in which the records are loaded; options per record type are list below)_
  - project: name, position, created_at, updated_at or random
  - post: name, created_at, updated_at, published_at or random
  - product: name, position, price, created_at, updated_at or random
  - comment: name, created_at, updated_at or random
  - image: title, position, color, created_at, updated_at or random
- way _(the direction of the order; only asc and desc are possible)_
- per_page _(the amount of records that are loaded; defaults to 30 if no value found in the paspartout settings)_
- page _(the page in pagination; for example if you have 40 projects and 30 per_page, project 32 will be on page 2)_


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
