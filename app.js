var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo');

// Routers
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var checkOutRouter = require('./routes/checkOut');
var addToCartRouter = require('./routes/addToCart');

var app = express();

// connects Mongoose to database and makes ready for use
mongoose.connect('mongodb+srv://nferreira:group3@cluster0.rnyg69k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// code to set up session system for web browser instance
app.use(
    session({
        secret: 'mysecret',
        resave: false,
        saveUninitialized: false,
        store: new MongoStore(
            {
                mongoUrl: "mongodb+srv://nferreira:group3@cluster0.rnyg69k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
            }),
        // timer will delete the expired session so not saved to mongo
        cookie: { maxAge: 180 * 60 * 1000}
    }));
app.use(express.static(path.join(__dirname, 'Project1')));

// middleware function for session and paths
app.use(function(req, res, next){
    res.locals.session = req.session;
    next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/checkOut', checkOutRouter);
app.use('/addToCart', addToCartRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
