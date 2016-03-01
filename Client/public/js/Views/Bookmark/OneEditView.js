define([
    'underscore',
    'marionette',
    'text!Templates/Bookmark/OneEdit.html'

],function(_, Marionette, template) {

    var view = Marionette.ItemView.extend({

        template: _.template(template),

        events:{
            'submit form':'_onSubmit'
        },

        initialize:function(options){
            this.model = options.model;

            this.listenTo(this.model, {
                'sync': this.render
            })
        },

        onRender: function() {
            console.log('render OneEditView ', this.model);
        },

        serializeData:function(){
            return {
                model:this.model.toJSON()
            }
        },

        _onSubmit: function(e){
            var $form = $(e.currentTarget),
                data = $form.serializeJSON({parseAll:true});

            console.log('_onSubmit OneEditView >>> ', data);

            this.trigger('create-new-data', data);

            e.preventDefault();
        }



    });

    return view;
});
