define([
    'backbone',
    'Controllers/ControllerBase',
    'Models/Bookmark',
    'Collections/Bookmarks',
    'Views/Bookmark/ListView',
    'Views/Bookmark/OneView',
    'Views/Bookmark/OneEditView'

], function (Backbone, ControllerBase, Model, Collection, ListView, OneView, EditView) {

    var controller = ControllerBase.extend({
        titleHeader: 'Bookmarks',

        initialize: function (options) {
            ControllerBase.prototype.initialize.apply(this, arguments);
            this.accountManager = options.accountManager;
        },

        activate: function (data) {
            //proxy-run by default
            this.initOne(data);
        },

        initList: function () {
            console.log('init list page uhahaha');
            this.collection = new Collection();
            this.view = new ListView({
                collection: this.collection
            });

            this._fetchCollection();
            this.options.applicationView.showContent(this.view);
        },

        initOne: function (id) {
            console.log('init one', id);
            var _id = id || null;

            this.model = new Model({
                RowKey: _id
            });

            if (_id) {
                this.view = new OneView({
                    model: this.model
                });

                this.options.applicationView.showContent(this.view);
                this._getOne(_id);
            }
        },

        _fetchCollection: function () {
            var that = this,
                syncOptions = {
                    success: function (model, resp, xhr) {
                        that.stored = that.collection;
                        console.log('success get items');
                    },
                    error: function () {
                        console.log('error getting item');
                    }
                };

            this.collection.fetch(syncOptions);
        },

        _getOne: function (id) {
            //this.model.fetch(syncOptions);
        },

        updateOne: function (data) {
            var that = this,
                syncOptions = {
                    cdata: data,
                    success: function (model, resp, xhr) {
                        console.log('success update ONE item');
                        that.options.router.navigate('/', true);
                    },
                    error: function () {
                        console.log('error update ONE item');
                    }
                };

            this.model.sync(data.RowKey ? 'update' : 'create', this.model, syncOptions);
        }

    });

    return controller;
});