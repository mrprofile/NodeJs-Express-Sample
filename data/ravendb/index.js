(function (data) {

    var database = require("./database.js");
    var moment = require('moment');

    data.getSliders = function(next) {
        database.getDb(function(err, db){
            if(err)
            {
                next(err,null);
            }
            else{

                var theQuery = {
                    KeywordKeys: 4710,
                    PublishDate : "[* TO " + moment().format('YYYY-MM-DDTHH:mm:ss.sssZ') + "] AND -PublishDate: 00010101000000000",
                    ExpirationDate : "00010101000000000 OR ExpirationDate: [ " +  moment().format('YYYY-MM-DDTHH:mm:ss.sssZ') + " TO *]"
                };

                db.queryByIndex("Sliders/Search", theQuery, 0, 5, "-PublishDate",  function(err, results){
                    next(err, JSON.parse(results.body).Results);
                })
            }
        });
    }

    data.getShowMenuItems = function(next) {
        database.getDb(function(err, db){
            if(err)
            {
                next(err,null);
            }
            else{

                db.getDocument("ShowBox/1", function(err, results){
                    next(err, results);
                })
            }
        });
    }

    data.getSchedule = function(next) {
        database.getDb(function(err, db){
            if(err)
            {
                next(err,null);
            }
            else{

                db.getDocument("scheduleData/0", function(err, results){
                    next(err, results);
                })
            }
        });
    }

    data.getShowPackage = function(showPackageName, next) {
        database.getDb(function(err, db) {

            if(err) {
                next(err, null);
            } else {                
                db.queryByIndex("ShowPackages/BySlug", { Slug: showPackageName }, 0, 1, null, function(err, results){

                   // console.log("results:" + results.body);

                    next(null, JSON.parse(results.body).Results[0]);
                });
            }

        });

    }

    //PublishDate = doc.PublishDate, WebPageUrl = doc.WebPageUrl
    data.getShowPromotions = function(showPackageName, next){

        database.getDb(function(err, db){
            if(err)
            {
                next(err,null);
            }
            else{

                var theQuery = {
                    WebPageUrl: "/shows/" + showPackageName + "/"                    
                };

                db.queryByIndex("Promotions/Index", theQuery, 0, 4, null,  function(err, results){
                    
                    next(err, JSON.parse(results.body).Results);
                })
            }
        });
    }

})(module.exports);