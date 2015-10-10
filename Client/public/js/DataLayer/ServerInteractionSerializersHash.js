define([], function () {
    'use strict';


    return {
        AccountManager: {
            login: {
                buildRequest: function (options, model) {
                    return {
                        url: 'Login',
                        request: options.cdata
                    };
                },
                parseResponse: function (response) {
                    if (response.Data) {
                        return response.Data;
                    } else {
                        return response.responseJSON.Description;
                    }
                }
            },

            logout: {
                buildRequest: function (options, model) {
                    return {
                        type: 'POST',
                        url: 'Logout',
                        request: {}
                    };
                },
                parseResponse: function (response) {
                    return response.Data;
                }
            }
        },

        BookmarkManager:{
            getAll: {
                buildRequest: function (options, model) {
                    return {
                        type: 'GET',
                        url: 'bookmark'
                    };
                },
                parseResponse: function (response, options) {
                    return options.xhr.responseJSON;
                }
            },

            read:{
                buildRequest: function (options, model) {
                    return {
                        type: 'GET',
                        url: 'bookmark/'+model.id
                    };
                },

                parseResponse: function (response, options) {
                    return options.xhr.responseJSON;
                }
            },

            update:{
                buildRequest: function (options, model) {
                    return {
                        type: 'PUT',
                        url: 'bookmark/'+model.id,
                        request: options.cdata
                    };
                },

                parseResponse: function (response, options) {
                    return options.xhr.responseJSON;
                }
            },

            create:{
                buildRequest: function (options, model) {
                    return {
                        type: 'POST',
                        url: 'bookmark',
                        request: options.cdata
                    };
                },

                parseResponse: function (response, options) {
                    return options.xhr.responseJSON;
                }
            },

            remove:{
                buildRequest: function (options, model) {
                    return {
                        type: 'POST',
                        url: 'bookmark/delete/'+model.id
                    };
                },

                parseResponse: function (response, options) {
                    return options.xhr.responseJSON;
                }
            }
        }
    };
});

