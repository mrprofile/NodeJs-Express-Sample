(function (showsController) {

    var ravendb = require("../data/ravendb");
    var data = require("../data");
    var async = require('async');
    var _ = require('extend');

    showsController.init = function(app) {

        app.get('/shows', function(req, res) {

            var basePageModel = require("../models/page.js");
            var model = new basePageModel({ title: 'Esquire Network Television Shows'}, req);
            var homeObjects = _(true, homeObjects, model.getDefault);

            model.AdZone = "shows";

            homeObjects["shows"] = function (callback) {

                data.getFeatured(function (err, results){
                    callback(null, results);
                });   
                
            };                

            async.parallel(homeObjects, function(err, results){
               if(!err) {
                   model = _(true, model, results);                   
                   res.render('./shows/index', model);
               } 
            });
        });


        app.param('showPackageName', function (req, res, next, showPackageName) {
            ravendb.getShowPackage(showPackageName, function(err, results){
                if(err) {
                    next(err, null);
                } else {
                    req.show = results;
                    next();
                }
            });

        })

        app.get('/shows/:showPackageName', function (req, res){

            var showPackageName = req.params.showPackageName;
            var basePageModel = require("../models/page.js");
            var model = new basePageModel({ title: 'Esquire Network Television Shows'}, req);
            var homeObjects = _(true, homeObjects, model.getDefault);
            model.show = req.show;
            model.AdZone = "shows";
            
            
            // console.log(req.show);

            // homeObjects.show = function (callback) {

            //     ravendb.getShowPackage(showPackageName, function(err, results){

            //         if(err) {
            //             callback(err, null);

            //         } else {


            //             callback(null, results);
            //         }
            //     });
                
            // }; 


            homeObjects.promos = function(callback) {

                async.parallel({
                    "promo1": function(cb) {
                        ravendb.getPromotionItems({ WebPageUrl: '/shows/' + showPackageName + '/', SlotName : 'Promo Slot 1' }, function(err, results){
                            cb(null,  results[0]);
                        });
                    },
                    "promo2": function(cb) {
                        ravendb.getPromotionItems({ WebPageUrl: '/shows/' + showPackageName + '/', SlotName : 'Promo Slot 2' }, function(err, results){
                            cb(null,   results[0]);
                        });
                    },
                    "promo3": function(cb) {
                        ravendb.getPromotionItems({ WebPageUrl: '/shows/' + showPackageName + '/', SlotName : 'Promo Slot 3' }, function(err, results){
                            cb(null,   results[0]);
                        });
                    },
                    "promo4": function(cb) {
                        ravendb.getPromotionItems({ WebPageUrl: '/shows/' + showPackageName + '/', SlotName : 'Promo Slot 4' }, function(err, results){
                            cb(null,   results[0]);
                        });
                    }

                }, function(err, results){

                    if(err == null) {                        
                        callback(null, results);
                    } else {

                        callback(err, null);
                    }
                })                
            }           

            async.parallel(homeObjects, function(err, results){
               if(!err) {
                   model = _(true, model, results);
                   res.render('./shows/detail', model);
               } else {
                console.log(err);
                    res.status(404).render('error', err);
               }
            });

        });        
    };
})(module.exports);