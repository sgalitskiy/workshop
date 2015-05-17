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
            this.collection = new Collection();
            this.view = new ListView({
                collection: this.collection
            });

            this.listenTo(this.view,{
                'remove':this._removeOne
            }, this);

            this._fetchCollection();
            this.options.applicationView.showContent(this.view);
        },

        initOne:function(id){
            console.log('init one', id);
            var _id =  id || null;

            this.model = new Model({
                RowKey:_id
            });

            if (_id){
                this.view = new OneView({
                    model: this.model
                });

                this.options.applicationView.showContent(this.view);
                this._getOne(_id);
            }
        },

        editOne:function(id){
            var _id = id || null;

            if (_id){
                this.model = new Model({
                    RowKey: _id
                });

                this._getOne();
            } else {
                this.model = new Model({
                    RowKey:null
                });
            }

            this.view = new EditView({
                model: this.model
            });

            this.listenTo(this.view,{
                'submit': this.updateOne
            },this);

            this.options.applicationView.showContent(this.view);

            console.log('edit one');
        },

        _fetchCollection:function(){
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

        _getOne:function(){
            if (this.collection && this.collection.length){
                var model = this.collection.get(this.model.id);
                this.model.set(model.toJSON());
                this.model.trigger('sync');
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

        updateOne: function(data){
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

            this.model.sync(data.RowKey ? 'update': 'create', this.model, syncOptions);
        },

        _removeOne:function(id){
            var that = this,
                model = this.collection.get(id),
                syncOptions = {
                    success: function (model, resp, xhr) {
                        console.log('success update ONE item');
                        that.collection.remove(model);
                        that.view.render();
                    },
                    error: function () {
                        console.log('error update ONE item');
                    }
                };

            model.sync('delete', model, syncOptions);
        }

    });

    return controller;
});