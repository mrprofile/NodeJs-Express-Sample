var express = require("express");
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var lessMiddleware = require('less-middleware');
var vash = require('vash');
var app = express();

// opt-in services
app.use(bodyParser.urlencoded({ extended: true }));
var jsonParser = bodyParser.json();
app.use(jsonParser);
app.use(cookieParser());
app.use(session({secret: 'in and out burger'}));

app.use(lessMiddleware(__dirname + '/public'));
app.use(express.static(__dirname + "/public"));

var webControllers = require("./controllers");
var apiControllers = require("./apicontrollers");

// map routes
webControllers.init(app);
apiControllers.init(app);

// view engine setup
app.set('view engine', "vash");

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

//TODO: move this to its own file
vash.helpers.RenderResizeImageUrl = function (imageUrl, width, height, useProd) {
    var urlPattern = /^(https?:\/\/[^\/]+)?\/images\//i;
    var urlPattern2 = /^(https?:\/\/[^\/]+)?\//i;
    var baseUrl = "http://tv.esquire.com/images/";    
    var slug = imageUrl.replace(urlPattern, "");
    slug = slug.replace(urlPattern2, "");

    var resizedImageUrl = baseUrl + "cimg_" + width + "x" + height + "/" + slug;

    if(useProd){

    } 

    this.buffer.push('<img class="lazy" src="http://tv.esquire.com/images/static/global/blank.gif" data-original="'+ resizedImageUrl +'" />');


};

vash.helpers.RenderTuneIn = function (tuneIn, size) {
    var pattern = /\[(time|badge|text)([^\]]+)\]/g;    
    var strTuneIn = '';   
    var matches = pattern.exec(tuneIn);// = tuneIn.match(pattern);   

    while(matches != null) {        
        switch(matches[1]){
            case "time":
                strTuneIn += '<div class="time-tag">';
                strTuneIn += '<span class="time pacific ' + size + '">' + matches[2].trim() + "</span>";
                strTuneIn += '</div>';
            break;
            case "badge":
                strTuneIn += '<div class="show-info-day"><span class="day ';
                strTuneIn += size;
                strTuneIn += '">';
                strTuneIn += matches[2].trim();
                strTuneIn += "</span></div>";
            break;
            case "text":
                strTuneIn += '<div class="show-info-text"><span class="';
                strTuneIn += size;
                strTuneIn += '">';
                strTuneIn += matches[2].trim();
                strTuneIn += "</span></div>";
            break;
        }

        matches = pattern.exec(tuneIn);
    }

    this.buffer.push(strTuneIn);
}

// start server
app.listen(1337);