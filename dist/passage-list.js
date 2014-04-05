(function (Ember) {
var PassageController = Ember.ObjectController.extend({
  apiKey: Ember.computed.alias('parentController.apiKey'),
  translation: Ember.computed.alias('parentController.translation'),

  baseUrl: function () {
    var apiKey = this.get('apiKey'),
      translation = this.get('translation'),
      url = 'http://api.biblia.com/v1/bible/content/',
      params;

    if (apiKey && translation) {
      params = Ember.$.param({
        key: apiKey
      });
   
      return url + translation + '.json?' + params;
    }
  }.property('apiKey', 'translation'),

  actions: {
    fetchContent: function (passage) {
      var baseUrl = this.get('baseUrl'), 
        component = this.get('parentController'),
        params, url;

      if (passage && baseUrl) {
        params = Ember.$.param({
          passage: passage
        });

        url = baseUrl + '&' + params;

        Ember.$.get(url).done(function (data) {
          if (data) {
            component.sendAction('action', data.text);
          }
        });
      }
    }
  }
});

var PassageListComponent = Ember.Component.extend({
  tagName: 'ul',
  translation: 'ASV',
  passageClass: 'label label-default',
  passages: Ember.A(),
  apiKey: null,
  source: null,

  scanUrl: function () {
    var source = this.get('source'),
      apiKey = this.get('apiKey'),
      params;
      
    if (source && apiKey) {
      params = Ember.$.param({
        text: source,
        key: apiKey
      });

      return 'http://api.biblia.com/v1/bible/scan/?' + params;
    }
  }.property('source', 'apiKey'),

  scanSource: function () {
    var source = this.get('source'),
      url = this.get('scanUrl'),
      self = this;
  
    Ember.$.get(url)
      .done(function (data) {
        if (data && data.results && Ember.isArray(data.results)) {
          self.set('passages', data.results.mapBy('passage'));
        }
      });
  }.observes('source', 'scanUrl').on('init')
});

Ember.Application.initializer({
  name: 'passage-list',

  initialize: function(container, application) {
    container.register('component:passage-list', PassageListComponent);
    container.register('controller:passage', PassageController);
    application.inject('component:passage-list', 'passage', 'controller:passage');
  }
});

}(window.Ember));