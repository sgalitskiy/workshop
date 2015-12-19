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
                'remove':this._onRemove,
                'remove-batch':this._onRemove
            }, this);

            this._fetchCollection();
            this.options.applicationView.showContent(this.view);
        },

        one:function(id, view){
            console.log('init one', id);
            var _id = id || null;

            this.model = new Model({
                RowKey: _id
            });

            this.view = new view({
                model:this.model
            });

            this.listenTo(this.view, {
                'save-data':this._onSave
            }, this);

            this.options.applicationView.showContent(this.view);

            if (_id){
                this._getOne(_id);
            }
        },

        initOne: function (id) {
            this.one(id, OneView);
        },

        initEditMode:function(id){
            this.one(id, EditView);
        },



        _fetchCollection: function () {
            //if (!(this.collection && this.collection.length)){
            //    //...store
            //} else {
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
            //}
        },

        _getOne: function (id) {
            var model;
            if (this.collection && (model = this.collection.get(id))){
                this.view.model = model;
                this.view.render();
            } else {
                // check collection
                var that = this,
                    syncOptions = {
                        success: function (model, resp, xhr) {
                            console.log('success get ONE items');
                        },
                        error: function () {
                            console.log('error getting ONE item');
                        }
                    };

                this.model.fetch(syncOptions);
            }
            //this.model.fetch(syncOptions);
        },

        _onSave:function(data){
            console.log('controller', data);
            var that =  this;

            var syncOptions = {
                cdata: data,
                success: function (model, resp, xhr) {
                    that.options.router.navigate('/', true);
                    console.log('success update ONE item');
                },
                error: function () {
                    console.log('error update ONE item');
                }
            };

            this.model.sync(data.RowKey? 'update':'create', this.model, syncOptions);

        },

        _onRemove:function(id){
            console.log('removeitem', id);
            var that = this;

            var removeOneItem = function(_id){
                var model = that.collection.get(_id);

                var syncOptions = {
                    success: function (model, resp, xhr) {
                        that.collection.remove(model);
                        //that.options.router.navigate('/', true);
                        console.log('success remove ONE item');
                    },
                    error: function () {
                        console.log('error remove ONE item');
                    }
                };

                model.sync('delete', model, syncOptions);
            };

            if (typeof id != 'string'){
                for (var i= 0,l=id.length; i<l; i++){
                    removeOneItem(id[i])
                }
            } else {
                removeOneItem(i)
            }

        }




    });

    return controller;
});