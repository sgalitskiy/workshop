define([
    'underscore',
    'marionette',
    'text!Templates/Bookmark/newBookmark.html'

],function(_, Marionette, template) {

    var view = Marionette.ItemView.extend({

        template: _.template(template),

        events:{

        },

        initialize:function(options){
            console.log('addBookmarkView inited');

            // this.model = options.model;

        },

        onRender: function() {
            console.log('render addBookmarkView');
        }

    });

    return view;
});
