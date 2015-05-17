var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer  = require('multer');

var routes = require('./routes/index');
var nconf = require('nconf');
var request = require('request');


nconf.env().argv().file('sendMail', {
    file: 'config.json',
    search: true
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({limit: '5mb', extended: false }));
app.use(cookieParser('SomEse12cretS32tring'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(multer({ dest: './uploads/'}));

app.use('/', routes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

var authorizationCheck = function(req, res, callback){
    if(req.signedCookies.name){
        res.clearCookie('name');
        res.cookie('name', req.signedCookies.name,{
            signed: true,
            maxAge: 2 * 60 * 60 * 1000
        });
        callback(req, res);
    }else{
        res.status(403);
        res.json({
            rewrite: false,
            status: 403
        });
    }
};


module.exports = app;
