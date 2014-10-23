(function (homeController) {
    
    var data = require("../data");
    var ravendb = require("../data/ravendb");
    var async = require('async');

    homeController.init = function(app) {

        app.get('/', function(req, res) {

            var err = "";
            var sliders = [];
            var showMenuItems = [];

            var renderPage = function () {
                res.render('./home/index', { title: 'Home - Vash View Engine', error: err, showMenuItems: showMenuItems, sliders: sliders });
            }

            async.parallel({
                sliders : function (callback) {
                    ravendb.getSliders(function(err, results){
                        callback(null, results);
                    });
                },
                showMenuItems: function (callback) {
                    ravendb.getShowMenuItems(function(err, results){
                        callback(null, results);
                    });
                }
            }, function(err, results){
               if(!err) {
                   sliders = results.sliders;
                   showMenuItems = results.showMenuItems;
                   renderPage();
               } 
            });        
        });

        app.get('/contact', function(req, res) {

            data.getFeatured(function (err, results){
                res.render('./home/contact', { title: 'Contact - Vash View Engine', pageData: results});
            });

            
        });
    };

})(module.exports);