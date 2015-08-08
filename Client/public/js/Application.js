define([
    'backbone',
    'marionette',
    'Router',
    'Models/AccountManager',
    'Views/ApplicationView',
    'jqueryCookie'
],
function (Backbone, Marionette, Router, AccountManager, ApplicationView) {
    var that = this;

    $.ajaxSetup({
        statusCode: {
            /*                    400: function (e, q, t) { //validation errors
             var data = e.responseJSON.data,
             message = 'Error: ' + (data.descr || data.developerMessage);

             for (var key in data.validationErrors) {
             var fieldName = key.match(/\w+$/)[0]
             .replace(/\B[A-Z]/g, function() {return ' '+arguments[0].toUpperCase()})
             .replace(/\b[a-z]/g, function() {return arguments[0].toUpperCase()});

             message += '\n' + fieldName + ': ' + data.validationErrors[key].join(', ');
             }
             alert(message);
             },
             */
            401: function () {
                //hardcode clear data form localstorage :)
                delete localStorage['NYCSL-PrivateUser'];
                // Redirect the to the login page.
                that.accountManager.trigger('logout', Backbone.history.getHash());
            },

            403: function(options) {
                if(options.responseJSON.Code == 1001){
                    delete localStorage['NYCSL-PrivateUser'];
                    that.router.navigate('login', true);
                    return false;
                }

                if(JSON.parse(localStorage['NYCSL-PrivateUser']).Id){
                    var history = that.router._getHistory();
                    if(history.length > 1){
                        that.router.navigate(history[history.length-2], true);
                    }else{
                        that.router.navigate('', true);
                    }
                    alert('You are not allowed to perform this action. Please contact system administrator');
                }else{
                    that.router.navigate('login', true);
                }
            },

            404: function () {
                console.log('redirect ro 404');
                //location.replace("#404");
            },

            500: function (e, q, t) {
                //alert('Error code: 500\nInternal server error\nPlease contact support team');
            },

            502: function (e, q, t) {
                alert('Error code: 502\nPlease contact support team');
            },

            504: function (e, q, t) {
                alert('Error code: 504\nConnection timeout\nPlease contact support team');
            }
        }
    });


    var app = new Marionette.Application({
        model: this.accountManager
    });

    app.accountManager = new AccountManager();
    app.applicationView = new ApplicationView({
        model: app.accountManager
    });

    app.addRegions({
        'mainRegion': '#main'
    });

    app.mainRegion.show(app.applicationView);

    this.router = new Router(app);

    app.on("before:start", function(options){
    // todo:  show main loader
    });

    app.on('start', function (options) {
        //todo: hide main loader
        console.log('start app');
        if (Backbone.history) {

            Backbone.history.loadUrl = function (t) {
                var e = this.fragment = this.getFragment(t),
                    r = _.any(this.handlers, function (t) {
                        if (t.route.test(e)) {
                            t.callback(e);
                            return true;
                        }
                    });
                if (!r) {
//                    location.replace("404");
                    console.log('Route to 404')
                }
                return r;
            };

            Backbone.history.start();
        }
    });

    return app;
});