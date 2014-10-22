(function (homeController) {
    
    var data = require("../data");
    var ravendb = require("../data/ravendb");
    var async = require('async');

    homeController.init = function(app) {

        app.get('/', function(req, res) {

            var err = "";
            var slidersTop = [];
            var slidersBottom = [];

            var renderPage = function () {
                res.render('./home/index', { title: 'Home - Vash View Engine', error: err, sliders: slidersTop, slidersAgain: slidersBottom });
            }

            async.parallel({
                sliders1 : function (callback) {
                    ravendb.getSliders(function(err, results){
                        callback(null, results);
                    });
                },
                sliders2: function (callback) {
                    ravendb.getSliders(function(err, results){
                        callback(null, results);
                    });
                }
            }, function(err, results){
               if(!err) {

                    slidersTop = results.sliders1;
                    slidersBottom = results.sliders2;
                    renderPage();

               } 
            });        
        });



        app.get('/contact', function(req, res) {
            res.render('./home/contact', { title: 'Contact - Vash View Engine'});
        });
    };

    
})(module.exports);