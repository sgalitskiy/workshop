define([
    'marionette',
    'Views/HeaderView',
    'Views/FooterView',
    'text!Templates/Main.html'
],function(Marionette, HeaderView, FooterView, template) {

    var view = Marionette.LayoutView.extend({
        template: _.template(template),

        regions : {
            main: '#content',
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
                model:this.model,
                app: this.options.app
            }));
        },

        showContent:function(view){
            if (view){
                this.contentView = view;
            }
            this.main.show(this.contentView);
        },

        refreshContent: function(view){
            this.showContent(view);
        }

    });

    return view;
});