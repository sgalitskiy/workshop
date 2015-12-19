define([
    'backbone',
    'DataLayer/ModelSyncExtension',
    'DataLayer/ServerCommandExecutor',
    'DataLayer/ServerInteractionSerializersHash'

], function (Backbone, ModelSyncExtension, ServerCommandExecutor, ServerInteractionSerializersHash) {
    'use strict';

    var Model = Backbone.Model.extend({
        idAttribute : 'RowKey',
        url: 'someUrl',

        defaults: function () {
            return {
                'RowKey': null,
                'data-time': new Date().getTime()
            };
        },

        validate:function(data){
            //todo: add FE validation
            return true;
        },

        emptyMethod: function(data) {
            ServerCommandExecutor.execute(this, ServerInteractionSerializersHash.BookmarkManager.emptyMethod, data);
        }

    });

    ModelSyncExtension.extend(Model.prototype, {
        "create": ServerInteractionSerializersHash.BookmarkManager.create,
        "read": ServerInteractionSerializersHash.BookmarkManager.read,
        "update": ServerInteractionSerializersHash.BookmarkManager.update,
        "delete": ServerInteractionSerializersHash.BookmarkManager.remove
    });

    return Model;
});