define([
    'marionette',
    'Views/HeaderView',
    'Views/FooterView',
    'text!Templates/Main.html'
],function(Marionette, HeaderView, FooterView, template) {

    var view = Marionette.LayoutView.extend({
        template: _.template(template),

        regions : {
            container: '#content',
            header: '#header',
            footer: '.footer'
        },

        initialize:function(params){
            this.model = params.model;
        },

        onRender:function(){
            this.renderHeader();
            this.footer.show(new FooterView({model:this.model}));
        },

        renderHeader: function() {
            this.header.show(new HeaderView({
                model:this.model
            }));
        },

        showContent:function(view){
            if (view){
                this.contentView = view;
            }
            this.container.show(this.contentView);
        },

        refreshContent: function(view){
            this.showContent(view);
        }

    });

    return view;
});