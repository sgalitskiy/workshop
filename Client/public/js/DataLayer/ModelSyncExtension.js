define([
    'underscore',
    'backbone',
    'DataLayer/Constants',
    'DataLayer/ServerCommandExecutor'
], function (_, Backbone, Constants, ServerCommandExecutor) {
    'use strict';

    var ModelSyncExtension = {

        'sync': function (method, model, options) {

            options = options || {};

            // Find request factory
            var command = this.syncCommands[method];
            if (!command) {
                throw new Error(['Method ', method, 'not supported by this model instance. There is not server command object for this method.'].join(''));
            }

            // Get data grom serializer Hash
            var hashData = command.buildRequest(options, model);

            // Get requestUrl
            options = _.extend(options, {url: Constants.serverUrl + hashData.url, type: hashData.type || 'post', data:JSON.stringify(hashData.request)});


            // Set parse method for one call
            var oldParse = this.parse;
            this.parse = function (resp, options) {
                var parseResult = command.parseResponse(resp, options);
                // Unset parser to prevent invalid next call with another command context
                this.parse = oldParse;
                return parseResult;
            };

            var that = this;

            var error = options && options.error;
            options.error = function (model, xhr, options) {
                if (error) {
                    error(model, xhr, options);
                }
                that._modelTrigger('error', model, xhr, options);
            };

            var success = options && options.success;
            options.success = function (model, resp, options) {
                if (success) {
                    success(model, resp, options);
                }
//                that._modelTrigger('sync', model, resp, options);
            };
//			console.log("Server request. JSON={0}".format(requestJson));

            var xhr = ServerCommandExecutor._executeAjax(model, options);

            this._modelTrigger('request', model, xhr, options);
        },

        _modelTrigger: function (event, model, param1, options) {
            if (_.isArray(model)) {
                _.forEach(model, function (m) {
                    m.trigger(event, m, param1, options);
                });
            } else {
                model.trigger(event, model, param1, options);
            }
        }

    };

    return {
        'extend': function (model, commands) {
            _.extend(model, ModelSyncExtension);
            model.syncCommands = commands || {};
        }
    };
});