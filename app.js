var browserify = require('browserify-middleware');
var express = require('express');
var sassMiddleware = require('node-sass-middleware')
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var gameConfig = require('./game-config');

var index = require('./routes/index');

var app = express();

// set the config
app.set('gameConfig', gameConfig);
// Setup Jade
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Setup SASS
// Note: you must place sass-middleware *before* `express.static` or else it will not work.
var sass = sassMiddleware({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    debug: true,
    outputStyle: 'extended',
});

app.use(sass);

// Setup Browserify
browserify.settings({
  transform: [['babelify', {presets: ["es2015"]}]]
});

app.use('/es6', browserify(__dirname + '/public/es6'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/vendor', express.static(__dirname + '/node_modules/'));


app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.sendStatus(404)
  // var err = new Error('Not Found');
  // err.status = 404;
  // next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
