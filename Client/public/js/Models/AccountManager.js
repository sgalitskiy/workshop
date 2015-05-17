define([
    'jquery',
    'backbone',
    'DataLayer/ModelSyncExtension',
    'DataLayer/ServerCommandExecutor',
    'DataLayer/ServerInteractionSerializersHash',
    'backbone.safe',
    'jqueryCookie'

], function ($, Backbone, ModelSyncExtension, ServerCommandExecutor, ServerInteractionSerializersHash) {
    'use strict';

    var AccountManager = Backbone.Model.extend({
        idAttribute: 'Id',
        defaults: function () {
            return {
                LoginName: null,
                Password: null,
                Email: null
            };
        },

        safe: {
            key: 'Empty',
            reload: false
        },

        initialize: function () {
            if (this.safe.reload && typeof(this.safe.reload) != "boolean") {
                this.safe.reload();
            }
        },

        validate: function (args, options) {

        },

        _clearData: function () {
            if (this.safe.reset) {
                this.safe.reset();
            }
            this.clear().set(this.defaults);
        },

        _onLogin: function (data, backRoute, appView) {
            var that = this,
                options = _.extend({
                    success: function (model, response, options) {
                        that.set(response);
                        that.trigger('login-success', backRoute);
                        appView.renderHeader()
                    }
                }, data);

            ServerCommandExecutor.execute(this, ServerInteractionSerializersHash.AccountManager.login, options);
        },

        _onLogout: function () {
            var that = this,
                onLogout = function () {
                    that._clearData();
                    that.trigger('logout');
                },
                options = {
                    success: onLogout,
                    error: onLogout
                };

            ServerCommandExecutor.execute(this, ServerInteractionSerializersHash.AccountManager.logout, options);
            return false;
        }
    });

    ModelSyncExtension.extend(AccountManager.prototype, {
//        "update": ServerInteractionSerializersHash.AccountManager.update
    });

    return AccountManager;
});
