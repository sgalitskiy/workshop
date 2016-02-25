define([
    'underscore',
    'marionette',
    'text!Templates/Bookmark/One.html'

],function(_, Marionette, template) {

    var view = Marionette.ItemView.extend({

        template: _.template(template),

        events:{
            'submit form':'onSubmit'
        },

        initialize:function(options){
            this.model = options.model;

            this.listenTo(this.model, {
                'sync': this.render
            }, this);
        },

        onRender: function() {
            console.log('render one model');
        },

        serializeData:function(){
            return {
                model:this.model.toJSON()
            }
        },

        onSubmit: function(e){
            var $form = $(e.currentTarget),
                data = $form.serializeJSON({parseAll:true});
            console.log('OneView onSubmit ', data);
            this.trigger('save-data', data);
            e.preventDefault();
        }



    });

    return view;
});
