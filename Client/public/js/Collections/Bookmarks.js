define([
    'backbone',
    'Collections/Base',
    'Models/Bookmark',
    'DataLayer/ModelSyncExtension',
    'DataLayer/ServerCommandExecutor',
    'DataLayer/ServerInteractionSerializersHash'

], function (Backbone, BaseCollection, Model, ModelSyncExtension, ServerCommandExecutor, ServerInteractionSerializersHash) {
    'use strict';

    var Collection = BaseCollection.extend({
        model: Model,


        someMethod: function(data, model){
            //ServerCommandExecutor.execute(this, ServerInteractionSerializersHash.Manager.Action, options);
        },

        haha: function() {
            // console.log('haha ' + this.collection.models.get({'RowKey' : '0e981e52-6da7-4937-b88a-929a86a681d0'});
        }
    });

     ModelSyncExtension.extend(Collection.prototype, {
         'read': ServerInteractionSerializersHash.BookmarkManager.getAll
     });

    return Collection;
});
