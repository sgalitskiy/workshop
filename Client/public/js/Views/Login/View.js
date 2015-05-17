define([
    'underscore',
    'marionette',
    'text!Templates/Login/Index.html',
    'Components/MessagePopup/View',
    'formSerialize'
],function(_, Marionette, template, ViewMessagePopup) {

    return Marionette.ItemView.extend({
        className: 'page-signin',
        template: _.template(template),

        events:{
            'submit form':'_onSubmit'
        },

        initialize:function(options){
            this.listenTo(this, {
                'error':this._onError,
                'success':this._onSuccess
            }, this);
        },

        _onSubmit:function(e){
            var $form = e ? $(e.currentTarget) : this.$el.find('form'),
                data = _.extend({
                    StaySignedId:false
                }, $form.serializeJSON({parseAll:true}));

            this.trigger('login', data);

            return false;
        },

        _onError:function(e, data, resp){
            var view = new ViewMessagePopup({
                title: 'Sign In',
                header: 'Sign In failed',
                status: 'error',
                list: [data],
                buttons: [{
                    'class': 'btn btn-success js-close',
                    title: 'Ok'
                }]
            });
            $('body').append(view.render().$el).find('.js-send-message').prop('disabled',false);
        },

        _onSuccess:function(){
            console.log('success');
        }
    });
});