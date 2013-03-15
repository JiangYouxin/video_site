
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , fs = require('fs')
  , expressLayouts = require('express-ejs-layouts')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', 80);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.set('layout', 'layout');
  app.use(expressLayouts); 
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', function(req, res){
  fs.readdir('F:/A', function(err, files){
    res.render('index', { 'files': files });
  });
});

app.get('/play/:key', function(req, res){
  res.render('play', { 'key': req.params.key });
});

app.get('/file/:key', function(req, res){
  var file = req.params.key;
  res.send(file);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
