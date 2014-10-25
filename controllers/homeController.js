(function (homeController) {

    var ravendb = require("../data/ravendb");
    var data = require("../data");
    var async = require('async');
    var _ = require('extend');
    var basePageModel = require("../models/page.js");
    var stringUtil = require("../utils/stringHelpers.js");

    homeController.init = function(app) {

        app.use(function(req, res, next) {
            //console.log(req.url);

            data.getShortcut(function (err, results){
                if(req.url.count('/') == 1) {
                    if(req.url in results) {
                        //console.log('pre process request in for shortcut');
                        //console.log(results[req.url].redirect)
                        res.redirect(results[req.url].redirect);
                    }
                }
                next();
            });
        });

        app.get('/', function(req, res) {

            //var basePageModel = require("../models/page.js");
            var model = new basePageModel({ title: 'home page'}, req);
            var homeObjects = _(true, homeObjects, model.getDefault);

            homeObjects["sliders"] = function (callback) {
                    data.getSliders(function(err, results){
                        callback(null, results);
                    });
                };

            async.parallel(homeObjects, function(err, results){
               if(!err) {
                   model = _(true, model, results);
                   res.render('./home/index', model);
               } 
            });
        });

        app.get('/about', function(req, res){
            
            var model = new basePageModel({ title: 'Esquire TV - About'}, req);

            var aboutObjects = _(true, aboutObjects, model.getDefault);

            model.title = model.metaData.title;
            model.AdZone = "about";
            model.AdSizes = '[[300,250],[300,600],[300,1050]]';

            async.parallel(aboutObjects, function(err, results){
               if(!err) {
                   model = _(true, model, results);
                   res.render('./home/about', model);
               } 
            });
            

        });

        app.get('/terms', function(req, res){
            
            var model = new basePageModel({ title: 'Esquire TV - Terms of Service'}, req);

            var aboutObjects = _(true, aboutObjects, model.getDefault);

            model.title = model.metaData.title;
            model.AdZone = "termsofservice";
            model.AdSizes = '[[300,250],[300,600],[300,1050]]';
            
            async.parallel(aboutObjects, function(err, results){
               if(!err) {
                   model = _(true, model, results);
                   res.render('./home/terms', model);
               } 
            });
            

        });

        app.get('/adsales', function(req, res){
            var model = new basePageModel({ title: 'Esquire TV - Ad Sales'}, req);

            var aboutObjects = _(true, aboutObjects, model.getDefault);

            model.title = model.metaData.title;
            model.AdZone = "adsales";
            model.AdSizes = '[[300,250],[300,600],[300,1050]]';
            
            async.parallel(aboutObjects, function(err, results){
               if(!err) {
                   model = _(true, model, results);
                   res.render('./home/adsales', model);
               } 
            });
        });
    };
})(module.exports);