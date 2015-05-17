"use strict";
var azure = require('azure');
var url = require("url");
var queryString = require("querystring");
var _ = require('underscore');

module.exports = BookmarkController;
function BookmarkController(azureTable) {
    this.azureTable = azureTable;
}

BookmarkController.prototype = {
    getPublicField: function(object, withRow){
        var obj = _.pick(object, 'title', 'desc', 'location', 'priority');
        if (withRow){
            obj.RowKey = object.RowKey
        }

        return obj;
    },
    getBookmarks: function (callback) {
        var that = this;
        var query = azure.TableQuery
            .select()
            .from(that.azureTable.tableName)
            .where('PartitionKey eq ?', that.azureTable.partitionKey);
        that.azureTable.find(query, function itemsFound(error, items) {
            if (error) {
                callback(error)
            } else {
                callback(null, items);
            }
        });
    },
    getBookmarkById: function (request, callback) {
        var that = this;
        var query = azure.TableQuery
            .select()
            .from(that.azureTable.tableName)
            .where('RowKey eq ?', request.params.id);
        that.azureTable.find(query, function itemsFound(error, items) {
            if (error) {
                callback(error)
            } else {
                callback(null, items[0]);
            }
        });
    },

    insertBookmark: function insertBookmark(request, callback) {
        var that = this,
            bookmark = this.getPublicField(request.body);

        that.azureTable.addItem(bookmark, function itemAdded(error) {
            if (error) {
                callback(error)
            } else {
                callback(null, bookmark);
            }
        });
    },

    updateBookmark: function updateBookmark(request, callback) {
        var that = this;

        var bookmark = _.extend({
                PartitionKey: that.azureTable.partitionKey
            },
            this.getPublicField(request.body, true)
        );

        that.azureTable.updateItem(bookmark, function itemUpdated(error) {
            if (error) {
                callback(error)
            } else {
                callback(null, bookmark);
            }
        });
    },
    deleteBookmark: function deleteBookmark(request, callback) {
        var that = this;
        that.azureTable.deleteItem(request.params.id, function itemDeleted(error) {
            if (error) {
                callback(error);
            }
            else {
                callback(null, {message: "Item deleted"})
            }
        });
    }
};