require.config({
   //'urlArgs': "bust=" + (new Date()).getTime(),
//    'baseUrl': '../assets',
    shim: {
        'underscore': { 'exports': '_' },
        'backbone': {
            'deps': ['underscore', 'jquery'],
            'exports': 'Backbone'
        },
        'marionette': {
            'deps': ['backbone'],
            'exports': 'Marionette'
        },

        'backbone.safe': ['backbone'],

        'jquery': {'exports': ['$','jquery', 'jQuery', 'JQuery']},
        'jqueryCookie': ['jquery'],
        'hashchage': ['jquery'],
        'formSerialize': ['jquery'],
        'jqueryParseParams': ['jquery'],
        'bootstrap':['jquery']
    },

    paths: {
        'backbone': '../assets/backbone/backbone-min',
        'marionette': '../assets/backbone.marionette/backbone.marionette.min',
        'underscore': '../assets/underscore-amd/underscore-min',
        'backbone.safe': '../assets/backbone.safe',

        'jquery': '../assets/jquery/jquery.min',
        'jqueryCookie': '../assets/jquery.cookie',
        'hashchage': '../assets/jquery.hashchange',
        'formSerialize': '../assets/jquery.serializejson.min',
        'jqueryParseParams': '../assets/jquery.parseparams',

        'text': '../assets/text',
        'moment': '../assets/moment.min',

        'bootstrap': '../assets/bootstrap/js/bootstrap.min'
    }
});

require(['Application'], function (Application) {
    Application.start();
});