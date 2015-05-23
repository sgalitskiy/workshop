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
            console.log('render one edit page', this.model);
        },

        serializeData:function(){
            return {
                model:this.model.toJSON()
            }
        },

        _onSubmit:function(e){
            var data = $(e.currentTarget).serializeJSON();
            this.trigger('save', data);

            console.log('submit ololo');
            return false;
        }


    });

    return view;
});