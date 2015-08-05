define([
    'underscore',
    'marionette',
    'text!Templates/Bookmark/OneEdit.html'

],function(_, Marionette, template) {

    var view = Marionette.ItemView.extend({

        template: _.template(template),

        events:{

        },

        initialize:function(options){
            this.model = options.model;
        },

        onRender: function() {
            console.log('render one edit page', this.model);
        },

        serializeData:function(){
            return {
                model:this.model.toJSON()
            }
        }

    });

    return view;
});