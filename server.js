var express = require("express");
var app = express();

var webControllers = require("./controllers");
var apiControllers = require("./apicontrollers");

// view engine setup
app.set('view engine', "vash");

app.use(express.static(__dirname + "/public"));

// map routes
webControllers.init(app);
apiControllers.init(app);

// start server
app.listen(1337);