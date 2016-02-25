define([
    'underscore',
    'marionette',
    'text!Templates/Bookmark/List.html'

],function(_, Marionette, template) {

    var view = Marionette.ItemView.extend({

        template: _.template(template),

        events:{
            'submit form' : 'onDelete'
        },

        initialize:function(options){
            this.collection = options.collection;

            this.listenTo(this.collection, {
                'sync': this._renderList
            }, this);
        },

        onRender: function() {
            console.log('render event run');
        },

        serializeData:function(){
            return {
                collection: this.collection.toJSON(),
                header:'bla-bla'
            }
        },

        onDelete: function(e){
            var $form = $(e.currentTarget),
                data = $form.serializeJSON({parseAll:true});
            this.trigger('delete-model', data);
            e.preventDefault();
        },

        _renderList: function() {
            this.render();
        }

    });

    return view;
});
