Ember.Application.initializer({
  name: 'passage-list',

  initialize: function(container, application) {
    container.register('component:passage-list', PassageListComponent);
    container.register('controller:passage', PassageController);
    application.inject('component:passage-list', 'passage', 'controller:passage');
  }
});
