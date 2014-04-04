(function (Ember) {
var PassageController = Ember.ObjectController.extend({
  actions: {
    fetchContent: function (passage) {
      if (passage) {
        
      }
    }
  }
});

var PassageListComponent = Ember.Component.extend({
  tagName: 'ul',
  translation: 'ASV',
  passages: Ember.A(),
  apiKey: null,
  source: null,

  scanUrl: function () {
    var source = this.get('source'),
      apiKey = this.get('apiKey'),
      params;
      
    if (source && apiKey) {
      params =Ember.$.param({
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