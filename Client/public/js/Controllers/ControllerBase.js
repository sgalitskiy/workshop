define([
    'marionette',
    'Controllers/Constants'
],function(Marionette, Constants) {

    var appController = Marionette.Controller.extend({

        path:'',

        initialize: function (options) {

        },

        checkPermission:function(role, path){
            return true;
            //todo: add page ACL;

            //return Constants.RolePages[role].indexOf(path || this.path) != -1;
        },


        // Generate options for fetching some data from server.
        // NOTE:  This method should generalize building of options object in all inherited controllers.

        _getFetchOptions: function (success, controller) {
            var self = this;
            var options = {
                error: function (model, xhr, options) {
                    self.trigger("error", options.responseError);
                },
                success: controller && typeof(controller) == 'function' ? function (model, xhr) {
                    controller(model, xhr);
                } : success
            };
            return options;
        }
    });

    return appController;
});