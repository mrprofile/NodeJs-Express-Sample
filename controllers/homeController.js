(function (homeController) {
    
    var data = require("../data");
    
    homeController.init = function(app) {
        
        app.get('/', function(req, res) {
        
            data.getUsers(function (err, results){
           
            res.render('./home/index', { title: 'Home - Vash View Engine', error: err, users: results });
        
            });    
        });

        app.get('/contact', function(req, res) {
            res.render('./home/contact', { title: 'Contact - Vash View Engine'});
        });
    };
    
})(module.exports);