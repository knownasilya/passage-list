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
