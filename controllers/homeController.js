(function (homeController) {

    var ravendb = require("../data/ravendb");
    var data = require("../data");
    var async = require('async');
    var _ = require('extend');

    homeController.init = function(app) {

        app.get('/', function(req, res) {

            var basePageModel = require("../models/page.js");
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
    };
})(module.exports);