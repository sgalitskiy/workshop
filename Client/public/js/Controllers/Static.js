define([
    'backbone',
    'Controllers/ControllerBase',
    'Views/Static/View'

], function (Backbone, ControllerBase, View) {

    var controller = ControllerBase.extend({
        titleHeader: 'Bookmarks',

        initialize: function (options) {
            ControllerBase.prototype.initialize.apply(this, arguments);
            this.accountManager = options.accountManager;
        },

        activate: function (data) {
            //proxy-run by default
            this.initOne(data);
        },

        renderPage: function (pageId) {
            this.view = new View({
                model:this.accountManager,
                id: pageId
            });

            this.options.applicationView.showContent(this.view);
        }
    });

    return controller;
});