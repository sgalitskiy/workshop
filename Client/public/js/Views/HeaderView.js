define([
    'marionette',
    'Controllers/Constants',
    'text!Templates/Header.html'

], function (Marionette, Constants, template) {

    return Marionette.ItemView.extend({
        activeItemClassName: 'active',
        template: _.template(template),
        _hiddenMenuPages: ['404'],
        className:'container',

        events:{
            'click .js-logout':'_onLogout'
        },

        initialize: function (params) {
            this.listenTo(this.model, {
                activateMenuItem: this._activateMenuItem
            }, this);
        },

        onRender: function () {
            this.$menu = this.$el.find('#menu');
            this._toggleMenu(!this.model.id);
        },

        _changeHeader: function (titleHeader) {
            var title = Constants.TitlePre + (titleHeader ? ' - ' + titleHeader : '');
            if (titleHeader) {
                $(document).attr('title', title);
            }
        },

        _toggleMenu:function(showMenu){
            this.$menu.toggleClass('hidden', showMenu ||false);
        },

        _activateMenuItem: function (target, titleHeader) {
            this.$menu.toggleClass('hidden', !target || this._hiddenMenuPages.indexOf(target) != -1);

            var $items =  this.$menu.find('a');

            $items.parent().removeClass(this.activeItemClassName);

            var $selected = $items.filter('[href^="#' + target + '"]').parent().addClass(this.activeItemClassName);

            this._changeHeader(titleHeader || $selected.text());

            return !!$selected.length;
        },

        _onLogout: function (){
          this.model._onLogout();
          return false;
        }
    });
});