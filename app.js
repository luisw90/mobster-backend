var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var membersRouter = require('./routes/members');
var mobsRouter = require('./routes/mobs');

var app = express();

//Middleware
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Routers
app.use('/', indexRouter);
app.use('/members', membersRouter);
app.use('/mobs', mobsRouter);

module.exports = app;
