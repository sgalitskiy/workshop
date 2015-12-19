define([
    'underscore',
    'marionette',
    'text!Templates/Bookmark/List.html'

],function(_, Marionette, template) {

    var view = Marionette.ItemView.extend({

        template: _.template(template),

        events:{
            'click .js-remove' :'onRemove'
        },

        initialize:function(options){
            this.collection = options.collection;

            this.listenTo(this.collection, {
                'sync': this._renderList,
                'remove': this._renderList
            }, this);
        },

        onRender: function() {
            console.log('render event run');
        },

        serializeData:function(){
            return {
                title: 'Collection list',
                collection: this.collection.toJSON()
            }
        },

        _renderList: function() {
            this.render();
        },

        onRemove:function(e){
            var id = $(e.currentTarget).closest('tr').data('id');
            this.trigger('remove', id);

            e.preventDefault();
        }



    });

    return view;
});