(function (userController) {
    var data = require("../data");
    
    userController.init = function(app) {
        
        app.get('/api/users', function(req, res) {
            data.getUsers(function (err, results){
                res.set("Content-Type", "application/json");
                res.send(results);
            });    
        });
    };
})(module.exports);