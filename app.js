var express       = require('express')
var path          = require('path')
var favicon       = require('serve-favicon')
var logger        = require('morgan')
var cookieParser  = require('cookie-parser')
var bodyParser    = require('body-parser')
var mongoose      = require('mongoose')

global.__base = __dirname + '/';

// Routes
var routes = require('./routes/index');
var users  = require('./routes/users');
var visits = require('./routes/visits');

// API
var api = {
  v1: {
    visits: require('./routes/api/v1/visits'),
    locations: require('./routes/api/v1/locations')
  }
}

var app = express();

console.log(process.env.MONGOLAB_URI);

// mongodb setup 
mongoose.connect(process.env.MONGOLAB_URI, function (error) {
  if (error) console.error(error);
  else console.log('mongo connected');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/visits', visits);

// Rewrite API requests
app.use(function(req, res, next) {
  req.url = req.url.replace(/\.[^/.]+$/, "")
  console.log(req.url)
  // res.redirect(req.url)
  next()
})

// API
app.use('/api/v1/visits', api.v1.visits)
app.use('/api/v1/locations', api.v1.locations)


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


module.exports = app;
