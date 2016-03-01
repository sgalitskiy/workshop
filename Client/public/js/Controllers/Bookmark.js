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
            console.log('initList ready');
            this.collection = new Collection();
            this.view = new ListView({
                collection: this.collection
            });

            this._fetchCollection();
            this.options.applicationView.showContent(this.view);
        },

        initOne: function (id) {
            console.log('initOne ID >>> ', id);
            var _id = id || null;

            this.model = new Model({
                RowKey: _id
            });

            this.view = new OneView({
                model:this.model
            });

            this.listenTo(this.view, {
                'save-data': this.updateOne
            }, this);

            this._getOne(_id);

            this.options.applicationView.showContent(this.view)

            // console.log('IDDDDD ' + this.model.id);

        },

        initCreate: function (id) {
            // console.log('Bookmark controller init Create', id);
            // var _id = id || null;
            this.model = new Model({
                // RowKey: _id
            });

            this.view = new EditView({
                model:this.model
            });

            this.listenTo(this.view, {
                'create-new-data': this.createOne
            }, this);

            // this._getOne(_id);

            this.options.applicationView.showContent(this.view)

            // console.log('initCreate ID ' + this.model.id);

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
            var that = this,
                syncOptions = {
                    success: function (model, resp, xhr) {
                        console.log('success get one item');
                    },
                    error: function () {
                        console.log('error getting one item');
                    }
                };

            this.model.fetch(syncOptions);
        },

        updateOne: function (data) {
            console.log('updateOne >>> ', data);

            var that = this,
                syncOptions = {
                    cdata:data,
                    success: function (model, resp, xhr) {
                        console.log('success get one item');
                    },
                    error: function () {
                        console.log('error getting one item');
                    }
                };
                this.model.sync('update', this.model, syncOptions);
            },

        createOne: function (data) {
            console.log('createOne >>> ', data);

            var that = this,
                syncOptions = {
                    cdata:data,
                    success: function (model, resp, xhr) {
                        console.log('success get one item');
                    },
                    error: function () {
                        console.log('error getting one item');
                    }
                };
                this.model.sync('create', this.model, syncOptions);
            }

    });

    return controller;
});
