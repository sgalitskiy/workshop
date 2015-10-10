define([
    'underscore',
    'Controllers/Bookmark',
    'Controllers/Static',
    'Controllers/Login'

], function (_, Bookmark, Static, Login) {
    'use strict';

    return {
        create: function (application, router) {
            var params = {
                router: router,
                applicationView: application.applicationView,
                accountManager: application.accountManager,
                app: application
            };

            var controllers = {
                bookmarkController: new Bookmark(params),
                staticController: new Static(params),
                loginController: new Login(params)
            };

            _.forEach(controllers, function (controller, name) {
                controller.name = name;
            });

            return controllers;
        }
    };
});