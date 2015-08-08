define([
    'underscore',
    'marionette',
    'text!Templates/Bookmark/List.html'

], function (_, Marionette, template) {

    var view = Marionette.ItemView.extend({

        template: _.template(template),

        events: {
            'click .js-remove': 'onRemove'
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
                collection: this.collection.toJSON()
            }
        },

        _renderList: function () {
            this.render();
        },

        getTitle: function (id) {
            var model = this.collection.get(id);

            console.log(model);

            return model.get('title');
        },

        onRemove: function (e) {
            var id = $(e.currentTarget).closest('tr').data('id'),
                title = this.getTitle(id);

            if (confirm('Are you sure to remove bookmark\n"' + title + '"?')) {
                console.log('remove', id);
                this.trigger('remove', id);
            }
        }


    });

    return view;
});