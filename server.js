var express = require("express");
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session')

var app = express();

// opt-in services
app.use(bodyParser.urlencoded({ extended: true }));
var jsonParser = bodyParser.json();
app.use(jsonParser);
app.use(cookieParser());
app.use(session({secret: 'in and out burger'}))
app.use(express.static(__dirname + "/public"));

var webControllers = require("./controllers");
var apiControllers = require("./apicontrollers");

// map routes
webControllers.init(app);
apiControllers.init(app);

// view engine setup
app.set('view engine', "vash");

//TEST THIS PIECE OF CODE
app.post('/testme', jsonParser,  function(req, res) {
    console.log("Session: %j", req.body);
    res.send('welcome ' + req.body.hello);
});

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

// start server
app.listen(1337);