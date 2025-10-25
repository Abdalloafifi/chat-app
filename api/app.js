var express = require('express');
var path = require('path');

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
securityMiddleware(app);

//coectet db
conectet();

// // view engine setupy
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
app.use(cors({
    origin: ["https://loke-4f8e7.web.app"],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }));

app.use(express.static('client')); // خدمة الملفات الثابتة


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'frontend/dist')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/user', profileRouter);
app.use('/api/messager', messagerRouter);
// error handler
app.use(errorNotFound);
app.use(errorHandler);
module.exports = app;
