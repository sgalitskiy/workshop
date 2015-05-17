define([
    'marionette',
    'text!Templates/Footer.html',
    
    'moment',
    'bootstrap'

],function(Marionette, template) {

    var view = Marionette.ItemView.extend({
        className: 'container',
        template: _.template(template),

        initialize:function(options){

        }

    });

    return view;
});