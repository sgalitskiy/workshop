define([
    'underscore',
    'Controllers/ControllerBase',

    'Views/Login/View'

],function(_, ControllerBase, LoginView){

    return ControllerBase.extend({
        titleHeader:'Sign in',

        initialize:function(){
            ControllerBase.prototype.initialize.apply(this, arguments);
        },

        activate:function(backRoute){
            this.backRoute = backRoute;
            this.accountManager = this.options.accountManager;

            this.view = new LoginView({
                model:this.accountManager
            });

            this.listenTo(this.view, {
                'login':this._onLogin
            });

            // Show view
            this.options.applicationView.showContent(this.view);
            //highlight menu item
            this.accountManager.trigger('activateMenuItem', '', this.titleHeader);
        },

        _onLogin:function(data){
            var that = this,
                options = _.extend({
                    cdata: data,
                    error:function(model,response, xhr){
                        that.view.trigger('error', model, response, xhr);
                    }
                });

            this.accountManager._onLogin(options, this.backRoute, that.options.applicationView);
        }
    });
});