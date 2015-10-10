define([
    'underscore',
    'marionette',
    'text!Templates/Bookmark/List.html',

    'moment'

], function (_, Marionette, template) {

    var view = Marionette.ItemView.extend({

        template: _.template(template),

        events: {
            'click .js-remove':'onRemove',
            'click th':'onSort'
        },

        initialize: function (options) {
            this.collection = options.collection;

            this.listenTo(this.collection, {
                'sync': this._renderList,
                'remove':this._renderList
            }, this);

            this.sortBy = 'priority'

        },

        onRender: function () {
            console.log('render event run');
        },

        serializeData: function () {
            var sorted,
                collection = this.collection.toJSON();

            if (collection && collection.length) {
                if (this.sortBy == 'priority') {
                    sorted = _.sortBy(collection, function (item) {
                        return -item.priority
                    })
                } else if (this.sortBy == 'title') {
                    sorted = _.sortBy(collection, function (item) {
                        return (item.title + '').toLowerCase()
                    })
                }
            }

            return {
                collection: sorted,
                sortBy: this.sortBy
            }
        },

        _renderList: function () {
            this.render();
        },

        onRemove:function(e){
            var $item = $(e.currentTarget),
                id = $item.data('id');

            this.trigger('remove-item', id);

            console.log('on remove', id);

            e.stopPropagation();
        },

        onSort:function(e){
            console.log('sort run');
            var $th = $(e.currentTarget),
                sortBy = $th.data('sort');

            if (sortBy){
                this.sortBy = sortBy;
                this._renderList();
            }

            e.preventDefault();
        }


    });

    return view;
});