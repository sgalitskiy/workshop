define([
    'underscore',
    'marionette',
    'text!Templates/Bookmark/List.html',

    'moment'

], function (_, Marionette, template) {

    var view = Marionette.ItemView.extend({

        template: _.template(template),

        events: {
            'click .js-remove':'onRemove'
        },

        initialize: function (options) {
            this.collection = options.collection;

            this.listenTo(this.collection, {
                'sync': this._renderList,
                'remove':this._renderList
            }, this);

        },

        onRender: function () {
            console.log('render event run');
        },

        serializeData: function () {
            return {
                collection: this.collection.toJSON(),
                sortBy: 'title'
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
        }


    });

    return view;
});