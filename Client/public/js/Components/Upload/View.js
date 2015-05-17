define([
    'marionette',
    'text!Components/Upload/Template.html'

], function (Marionette, template) {

    return Marionette.ItemView.extend({
        template: _.template(template),
        defaultData: {
            Title: 'Upload file',
            Info: 'Max. file size: 5Mb, Expected file type: jpg, png',
            Buttons: [
                {Title: 'Upload', ClassName: 'btn-success js-upload'},
                {Title: 'Cancel', ClassName: 'btn-primary js-close'}
            ],
            dataType: ['image/png', 'image/jpg', 'image/jpeg']
        },

        className: 'popup-overlay',

        events: {
            'click .js-close': 'destroy',
            'click .js-upload': '_uploadImage'
        },

        initialize: function (options) {
            this.model = _.extend(this.defaultData, options || {});

            this.model.dataType.push('application/x-download')
        },

        serializeData: function () {
            return this.model;
        },

        onRender: function () {

        },

        _uploadImage: function () {
            var filesData = document.getElementById("file").files;
            if (filesData.length && (this.model.dataType.indexOf(filesData[0].type) != -1)) {
                this.trigger('click:UploadFile', filesData[0]);
                this.destroy();
            } else {
                this.$el.find('.file-wrapper').addClass('has-error');
            }
        }

    });
});