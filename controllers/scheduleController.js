(function (scheduleController) {

    var moment = require("moment");
    var ravendb = require("../data/ravendb");
    var data = require("../data");
    var async = require('async');
    var _ = require('extend');

    scheduleController.init = function(app) {

        app.get('/schedule', function(req, res) {

            var basePageModel = require("../models/page.js");
            var model = new basePageModel({ title: 'Esquire Network Television Schedule'}, req);
            var homeObjects = _(true, homeObjects, model.getDefault);

            model.AdZone = "schedule";

            // Generate the time stuffs here
            var timePosition = {};
            var timeArray = [];
            var current = new Date();
            var _dt = moment({ year: current.getFullYear(), month: current.getMonth(), day: current.getDate(), hour: 0, minute: 0, second: 0 });
            
            var _timeIncrement = 0;
            var _value = 0.0;
            while (_timeIncrement < 96)
            {
                timeArray.push(moment(_dt).toDate());
                timePosition[_dt.format('HH:mm')] = _value;
                _value += 0.5;
                _dt = _dt.add(15, "minutes");
                _timeIncrement++;           
            }

            homeObjects["schedule"] = function (callback) {

                data.getSchedule(function (err, results){
                    callback(null, results);
                });   
                
            };                

            async.parallel(homeObjects, function(err, results){
               if(!err) {
                   model = _(true, model, results);  
                   model.timePosition = timePosition;
                    model.timeArray = timeArray;                         
                   res.render('./schedule/index', model);
               } 
            });
        });
    };
})(module.exports);