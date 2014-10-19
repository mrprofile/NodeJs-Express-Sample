(function (controller) {
    var data = require("../data");

    controller.init = function(app) {
        
        app.post('/api/videos/increment', function(req, res) {
            data.getUsers(function (err, results){
                res.set("Content-Type", "application/json");
                res.send(results);
            });
        });
    };
})(module.exports);