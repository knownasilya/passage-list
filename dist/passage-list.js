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