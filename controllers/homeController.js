(function (homeController) {
    
    var data = require("../data");
    var redis_lib = require("redis");
    
    homeController.init = function(app) {

        app.get('/', function(req, res) {
        
            data.getUsers(function (err, results){
           
            res.render('./home/index', { title: 'Home - Vash View Engine', error: err, users: results });
        
            });    
        });

        app.get('/contact', function(req, res) {

            var publisher = redis_lib.createClient();
            var messageEnvelope =   {
                                        Channel: "Carlo Capil",
                                        Content: {
                                            ObjectSource: "Video",
                                            KeyId: 1234
                                        }
                                    };

            publisher.publish("CHANNEL.APPLICATION.RAVENDBINDEXER", JSON.stringify(messageEnvelope));

            res.render('./home/contact', { title: 'Contact - Vash View Engine'});
        });
    };
    
})(module.exports);