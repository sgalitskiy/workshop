var express = require('express');
var router = express.Router();

var azure = require('azure');
var BookmarkController = require('./../controllers/bookmark');
var AzureTable = require('./../lib/azuretable');
var nconf = require('nconf');
nconf.env().file({file: 'config.json'});
var tableName = nconf.get("TABLE_NAME");
var partitionKey = nconf.get("PARTITION_KEY");
var accountName = nconf.get("STORAGE_NAME");
var accountKey = nconf.get("STORAGE_KEY");

var azureTable = new AzureTable(azure.createTableService(accountName, accountKey), tableName, partitionKey);
var Bookmark = new BookmarkController(azureTable);

/* GET all bookmarks. */
router.get('/', function (req, res, next) {
    console.log('GET all items');
    Bookmark.getBookmarks(function (err, items) {
        if (err) next(err);
        res.send(items);
    });
});

//GET one by ID
router.get('/:id', function (req, res, next) {
    console.log('GET', req.params.id);
    Bookmark.getBookmarkById(req, function (err, item) {
        if (err) next(err);
        res.send(item);
    });
});

//create new
router.post('/', function (req, res, next) {
    console.log('POST', JSON.stringify(req.body));
    Bookmark.insertBookmark(req, function (err, item) {
        if (err) next(err);
        res.send(item);
    });
});

//update existing
router.put('/:id', function (req, res, next) {
    console.log('PUT', JSON.stringify(req.body));
    Bookmark.updateBookmark(req, function (err, item) {
        if (err) next(err);
        res.send(item);
    });
});

//delete new
router.delete('/:id', function (req, res, next) {
    console.log('DELETE', req.params.id);
    Bookmark.deleteBookmark(req, function (err, message) {
        if (err) next(err);
        res.send(message);
    });
});

module.exports = router;