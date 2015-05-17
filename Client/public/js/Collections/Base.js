define([
    'backbone'
], function (Backbone) {
    'use strict';

    var BaseCollection = Backbone.Collection.extend({});

    Backbone.Singleton = {
        getInstance: function (/*listeners, caller, options*/) {
            if (this._instance === undefined) {
                var that = this;
                this._instance = new that();
            }
            return this._instance;
        }
    };

    return _.extend(BaseCollection, Backbone.Singleton);
});