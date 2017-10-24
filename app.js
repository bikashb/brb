var express = require('express');
var session = require('express-session');
var passport = require('passport');
var app = express();
var cors = require('cors');
var server = require('http').createServer(app);
var bodyParser = require('body-parser');
var multer = require('multer');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({secret: 'ssshhhhh'}));
app.use(passport.initialize());
app.use(passport.session());



app.use(cors());
   
app.use('/api/v1', require('./router'));
app.use(express.static(__dirname + '/build/'));

exports = module.exports = app;
