(function (homeController) {
    
    var data = require("../data");
    var ravendb = require("../data/ravendb");
    var async = require('async');
    var _ = require('extend');

    var homeObjects = _(true, homeObjects, createBaseobj());

    homeController.init = function(app) {

        app.get('/', function(req, res) {

            var err = "";
            var sliders = [];
            var showMenuItems = [];
            
            var renderPage = function () {
                res.render('./home/index', { title: 'Home - Vash View Engine', controller: req.route.path, page: 'home', error: err, showMenuItems: showMenuItems, sliders: sliders });
            }

            homeObjects["showMenus"] = function (callback) {
                    ravendb.getShowMenuItems(function(err, results){
                        callback(null, results);
                    });
                };

            async.parallel(homeObjects, function(err, results){
               if(!err) {
                    
                   sliders = results.sliders;
                   
                   showMenuItems = results.showMenus;
                   renderPage();
               } 
            });      
        });

        app.get('/contact', function(req, res) {

            async.parallel(homeObjects, function(err, results){

                res.render('./home/contact', { title: 'Contact - Vash View Engine', showMenuItems: results.showMenuItems, pageData: results.sliders});


                // data.getFeatured(function (err, results){
                //     res.render('./home/contact', { title: 'Contact - Vash View Engine', pageData: results});
                // });

            });

            

            
        });
    };

    function createBaseobj()
    {
        return {
                "sliders" : function (callback) {
                    ravendb.getSliders(function(err, results){
                        callback(null, results);
                    });
                },
                "showMenuItems": function (callback) {
                    ravendb.getShowMenuItems(function(err, results){
                        callback(null, results);
                    });
                }
            };
    };

})(module.exports);