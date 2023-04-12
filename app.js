var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fileUpload = require('express-fileupload');
var session = require('express-session');

var hbs=require('express-handlebars')
var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');
var unicodRouter = require('./routes/unicod');
var volunteerRouter = require('./routes/volunteer');
var secretaryRouter = require('./routes/secretary');
var poRouter = require('./routes/po');
const { handlebars } = require('hbs');



handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
  return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

var app = express();
var app = express()
app.set('trust proxy', 1) // trust first proxy

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs',hbs.engine({extname:'hbs',defaultLayout:'layout',layoutDir:__dirname+'/views/layouts',partialDir:__dirname+'/views/partials'}))

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload({limits: { fileSize: 50 * 1024 * 1024 }}));

app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/unicod', unicodRouter);
app.use('/volunteer', volunteerRouter);
app.use('/secretary', secretaryRouter);
app.use('/po', poRouter);

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
