var express = require('express');
var path = require('path');
require('dotenv').config();

const conectet = require('./config/conectet');
const { errorNotFound, errorHandler } = require('./middlewares/error');
const securityMiddleware = require('./middlewares/securityMiddleware');
const cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var profileRouter = require('./routes/profile');
var messagerRouter = require('./routes/messagerrouter');

var app = express();

app.use(cors({
  origin: ['http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// ثانياً: أمان و middleware أخرى
securityMiddleware(app);

// ثالثاً: اتصال قاعدة البيانات
conectet();

// رابعاً: الباقي
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/user', profileRouter);
app.use('/api/messager', messagerRouter);

// أخيراً: معالجات الأخطاء
app.use(errorNotFound);
app.use(errorHandler);

module.exports = app;
