define([
    'underscore',
    'marionette',
    'text!Templates/Bookmark/OneEdit.html'

],function(_, Marionette, template) {

    var view = Marionette.ItemView.extend({

        template: _.template(template),

        initialize:function(options){
            this.model = options.model;

            this.listenTo(this.model, {
                'sync': this.render
            })
        },

        onRender: function() {

        },

        serializeData:function(){
            return {
                model:this.model.toJSON()
            }
        }


    });

    return view;
});