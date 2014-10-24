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
    };
})(module.exports);