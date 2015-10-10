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
        }
    });

     ModelSyncExtension.extend(Collection.prototype, {
         'read': ServerInteractionSerializersHash.BookmarkManager.getAll
     });

    return Collection;
}); 