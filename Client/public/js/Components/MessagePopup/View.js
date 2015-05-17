define([
    'marionette',
    'text!Components/MessagePopup/Template.html',
],function(Marionette, template) {

    var view = Marionette.ItemView.extend({
        template: _.template(template),

        className: 'popup-overlay',

        events:{
            'click .js-close': 'destroy',
            'click .js-apply': '_applyClicked'
        },

        initialize:function(options){
            this.model = options || {};
        },

        serializeData: function(){
            return this.model;
        },

        onRender:function(){
            
        },

        _applyClicked: function() {
            this.trigger('click:Apply');
        }
    });
    return view;
});