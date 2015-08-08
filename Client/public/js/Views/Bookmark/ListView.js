define([
    'underscore',
    'marionette',
    'text!Templates/Bookmark/List.html'

], function (_, Marionette, template) {

    var view = Marionette.ItemView.extend({

        template: _.template(template),

        events: {
            'click .js-remove': 'onRemove',
            'click th':'changeSort'

        },

        initialize: function (options) {
            this.collection = options.collection;

            this.listenTo(this.collection, {
                'sync': this._renderList,
                'remove':this._renderList,
                'super-event':this._renderList
            }, this);

            this.sortBy = "priority";
            this.sortABC = true;

        },

        onRender: function () {
            console.log('render event run');
        },

        serializeData: function () {
            var that = this;
            return {
                collection: _.sortBy(this.collection.toJSON(), function(item){return that.sortABC ? item[that.sortBy]: -item[that.sortBy]}),
                sortBy:this.sortBy
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
                this.trigger('remove', id);
            }
        },

        changeSort:function(e){
            var  sortBy = $(e.currentTarget).data('sort');

            if (sortBy){
                //this.sortABC = !this.sortABC;
                this.sortBy = sortBy;
                this.render();
            }
        }


    });

    return view;
});