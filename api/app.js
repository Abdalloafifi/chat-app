var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
 require("dotenv").config();
const conectet = require('./config/conectet');
const { errorNotFound, errorHandler } = require('./middlewares/error');
const securityMiddleware = require('./middlewares/securityMiddleware');
const cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var profileRouter = require('./routes/profile')
var messagerRouter = require('./routes/messagerrouter')

var app = express();

//coectet db
conectet();

// // view engine setupy
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
app.use(cors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }));
const compression = require("compression")
app.use(compression())
app.use(express.static('client')); // خدمة الملفات الثابتة

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(securityMiddleware);
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'frontend/dist')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/user', profileRouter);
app.use('/api/messager', messagerRouter);

// catch 404 and forward to error handler
app.use(errorNotFound);

// error handler
app.use(errorHandler);

module.exports = app;
