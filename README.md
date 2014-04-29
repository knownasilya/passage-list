passage-list
================

Ember Component for parsing out Bible passages and getting back their text in a specific translation.

```hbs
{{passage-list source='My favorite chapter is Rom 8' apiKey='df3gg4uuf'}}
```

## Getting Started

Install via Bower, `bower install passage-list --save`, then include in your page, and start using:

```html
<!doctype html>

<html lang="en">
<head>
  <meta charset="utf-8">
  <title>passage-list</title>

  <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css">
</head>

<body>
  <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
  <script src="http://builds.handlebarsjs.com.s3.amazonaws.com/handlebars-v1.3.0.js"></script>
  <script src="http://builds.emberjs.com/tags/v1.4.0/ember.js"></script>
  <script src="https://rawgithub.com/knownasilya/passage-list/master/dist/passage-list.template.js"></script>
  <script src="https://rawgithub.com/knownasilya/passage-list/master/dist/passage-list.js"></script>
  <script src="//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>
  
  <!-- application.hbs template -->
  <script type="text/x-handlebars">
    {{passage-list source='My two favorite verses are Rom 8:1 and Heb 12:1-2.' apiKey='fd37d8f28e95d3be8cb4fbc37e15e18e'}}
  </script>

  <script>
    var App = Ember.Application.create();
  </script>
</body>
</html>
```

### Options
#### Required
- `apiKey` -- The Biblia API key, required to make API calls to their service.
- `source` -- Text to parse for passages.

#### Optional
- `passages` -- You can pass in a pre-parsed array of passages.
- `translation` -- By default it's ASV, see [here][translations] for a list of available options.
- `bibliaContentOptions` -- Override the default content options, see the [Biblia Content API][content-api]. 
- `action` -- String of action name, action receives the text of the passage that's clicked on.

[translations]: http://api.biblia.com/docs/Available_Bibles
[content-api]: http://api.biblia.com/docs/Bible_Content
