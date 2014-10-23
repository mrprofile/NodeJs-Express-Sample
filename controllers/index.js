(function (controllers) {
    var fs = require("fs");
    var f = fs.readdirSync("./controllers");

    controllers.init = function(app) {

        for(var ctrl in f)
        {
            if(f[ctrl] != "index.js")
                require("./" + f[ctrl]).init(app);
        }
    };

})(module.exports);