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
                "bookmark/:id(/)":"initOne",
                "bookmark/:id/edit":"editOne",
                "addBookmark(/)":"editOne"
            }
        },

        initialize: function (application) {
            this.application = application;
            this._initControllers();
            this._initRoutes();
            this._initListeners();

            this.listenTo(this, 'route', function (name, args) {
                this.history.push(Backbone.history.fragment);
            });
        },

        _initControllers:function(){
            this.controllers = ControllersHashFactory.create(
                this.application,
                this);
        },

        _initListeners:function(){
            var that = this;

            this.listenTo(this.application.accountManager,{
                'login-success':function(backRoute){
                    var role = that.application.accountManager.get('RoleName'),
                        path;

                    if(backRoute && Constants.RolePages[role].indexOf(backRoute) != -1){
                        path = backRoute;
                    } else {
                        //path = Constants.RolePages[role][0].Url;

                        //
                        // @COMENTED FOR SERGEY
                        //
                    }

                    this.navigate(path, {trigger:true});
                },

                'logout':function(param){
                    that.application.accountManager._clearData();
                    this.navigate("login", { trigger: true });
                },

                'goTo' : function(path, trigger){
                    this.navigate(path, {trigger: trigger!==undefined ? trigger : true});
                }
            }, this);
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