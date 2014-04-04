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
