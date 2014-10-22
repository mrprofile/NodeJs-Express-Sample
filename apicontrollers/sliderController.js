(function (controller) {

    var ravendb = require("../data/ravendb");

    controller.init = function(app) {

        app.get('/api/sliders', function(req, res){

            ravendb.getSliders(function(err, results){
                if(err)
                {
                    res.render('error', { error: err});
                }
                else {
                    res.send(results);
                }
            })
        });
    };
})(module.exports);