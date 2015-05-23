define([
    'underscore',
    'marionette',
    'text!Templates/Bookmark/One.html'

],function(_, Marionette, template) {

    var view = Marionette.ItemView.extend({

        template: _.template(template),

        events:{

        },

        initialize:function(options){
            this.model = options.model;

            this.listenTo(this.model, {
                'sync': this.render
            }, this);
        },

        onRender: function() {
            console.log('render');
        },

        serializeData:function(){
            return {
                model:this.model.toJSON()
            }
        }

    });

    return view;
});