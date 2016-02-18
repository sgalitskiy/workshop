define([
    'underscore',
    'marionette',
    'text!Templates/Bookmark/List.html'

],function(_, Marionette, template) {

    var view = Marionette.ItemView.extend({

        template: _.template(template),

        sortBy:'priority',
        sortABC: true,

        events:{
            'click .js-remove' :'onRemove',
            'submit form' : 'onSubmit',
            'click .js-sortable':'onSort'
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
                sortBy: this.sortBy,
                sortABC: this.sortABC,
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
        },

        onSubmit:function(e){
            var $form = $(e.currentTarget),
                data = $form.serializeJSON({parseAll:true});

            console.log(data);

            if (data['delete'].length){
                this.trigger('remove-batch', data['delete']);
            }

            e.preventDefault();
        },

        onSort:function(e){
            var $item = $(e.currentTarget);

            this.sortBy = $item.data('sort');

            if ($item.hasClass('bg-danger')){
                this.sortABC = !this.sortABC
            }

            this.render();
        }



    });

    return view;
});