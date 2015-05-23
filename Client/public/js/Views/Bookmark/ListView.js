define([
    'underscore',
    'marionette',
    'text!Templates/Bookmark/List.html'

],function(_, Marionette, template) {

    var view = Marionette.ItemView.extend({

        template: _.template(template),

        events:{
            'click .js-remove': '_removeItem',
            'click .js-edit':'_editItem'
        },

        initialize:function(options){
            this.collection = options.collection;

            this.listenTo(this.collection, {
                'sync': this._renderList
            }, this);
        },

        onRender: function() {
            console.log('bla, render', this.collection);
        },

        serializeData:function(){
            return {
                collection: _.sortBy(this.collection.toJSON(),function(item){return -parseInt(item.priority)})
            }
        },

        _renderList: function() {
            console.log('bla-bla  render');
            this.render();
        },

        _removeItem:function(e){
            var id = $(e.currentTarget).data('id'),
                model = this.collection.get(id),
                modelJSON = model.toJSON(),
                message = 'Are sure to remove item\n' + modelJSON.title + '\n?';

            if (confirm(message)) {
                this.trigger('remove', id);
            }

            return false;
        },

        _editItem:function(e){
            var id = $(e.currentTarget).closest('tr').data('id');

            console.log('click to edit', id);
            return false;
        }

    });

    return view;
});