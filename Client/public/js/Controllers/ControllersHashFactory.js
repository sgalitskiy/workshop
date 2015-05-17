define([
    'underscore',
    'Controllers/Bookmark',
    'Controllers/Login'

], function (_, Bookmark, Login) {
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
                loginController: new Login(params)
            };

            _.forEach(controllers, function (controller, name) {
                controller.name = name;
            });

            return controllers;
        }
    };
});