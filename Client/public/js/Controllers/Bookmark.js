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

            this.listenTo(this.view, {
                'remove': this._onRemove
            }, this);

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

        editOne: function (id) {
            console.log('edit one router', id);

            var _id = id || null;

            this.model = new Model({
                RowKey: _id
            });

            this.view = new EditView({
                model: this.model
            });

            this.listenTo(this.view, {
                'save': this.updateOne
            }, this);


            this.options.applicationView.showContent(this.view);

            if (_id) {
                this._getOne(id);
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
            if (this.collection && this.collection.get(id)){
                this.model.set(this.collection.get(id).toJSON());
                this.view.render();
            } else {
                var syncOptions = {
                    success: function (model, resp, xhr) {
                        console.log('success get ONE item');
                    },
                    error: function () {
                        console.log('error getting ONE item');
                    }
                };

                this.model.fetch(syncOptions);
            }
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
        },

        _onRemove: function (id) {
            var that = this,
                model = this.collection.get(id),
                syncOptions = {
                    success: function (model, resp, xhr) {
                        console.log('success remove ONE item');
                        that.collection.remove(model);
                        that.view.render();
                    },
                    error: function () {
                        console.log('error remove ONE item');
                    }
                };

            model.sync('delete', model, syncOptions);
        }

    });

    return controller;
});