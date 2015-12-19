define([
    'backbone',
    'marionette',
    'Controllers/Constants',
    'Controllers/ControllersHashFactory'

],function(Backbone, Marionette, Constants, ControllersHashFactory) {
    var router = Marionette.AppRouter.extend({
        history: [],
        applicationRoutes :{
            "bookmark":{ // controller name
                //routes
                "(/)":"initList",
                "bookmark(s)/all":"initList",
                "bookmark/:id(/)":"initOne"
            }
        },

        initialize: function (application) {
            this.application = application;
            this._initControllers();
            this._initRoutes();

            this.listenTo(this, 'route', function (name, args) {
                this.history.push(Backbone.history.fragment);
            });
        },

        _initControllers:function(){
            this.controllers = ControllersHashFactory.create(
                this.application,
                this);
        },

        _getRoutes:function(route){
            return this.controllers[route+"Controller"];
        },


        _checkRoutes:function(){
            //todo:check Routes permission to redirect 403 page
        },

        _initRoutes:function(){
            var that = this;

            for (var key in this.applicationRoutes){
                var routes = {},
                    def = "activate"; // default method

                for (var zkey in this.applicationRoutes[key]){
                    routes[zkey] = this.applicationRoutes[key][zkey] || def;
                }

                that.processAppRoutes(that._getRoutes(key), routes);
            }
        },

        _getHistory: function() {
            return this.history;
        }

    });

    return router;
});