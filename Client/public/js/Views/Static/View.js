define([
    'underscore',
    'marionette',
    'text!Templates/Static/Contact.html',
    'text!Templates/Static/Default.html'

],function(_, Marionette, templateContact, template) {

    var view = Marionette.ItemView.extend({

        //template: _.template(template),

        events:{
        },

        initialize:function(options){
            this.model = options.model;

            console.log(options);
            this.template = _.template(options.id == 'contact' ? templateContact : template)
        },

        onRender: function() {
            console.log('render static page');
        },

        serializeData:function(){
            return {
                model:this.model.toJSON()
            }
        }

    });

    return view;
});