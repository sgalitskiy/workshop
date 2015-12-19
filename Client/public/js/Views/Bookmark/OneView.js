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

            this.listenTo(options.model, {
                'sync': this.render,
                'anoter':this.render
            }, this);
        },

        onRender: function() {
            console.log('render', this.model);

        },

        serializeData:function(){
            return {
                model:this.model.toJSON()
            }
        }

    });

    return view;
});