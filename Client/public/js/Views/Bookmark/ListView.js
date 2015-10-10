define([
    'underscore',
    'marionette',
    'text!Templates/Bookmark/List.html',

    'moment'

], function (_, Marionette, template) {

    var view = Marionette.ItemView.extend({

        template: _.template(template),

        events: {
           

        },

        initialize: function (options) {
            this.collection = options.collection;

            this.listenTo(this.collection, {
                'sync': this._renderList
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
        }


    });

    return view;
});