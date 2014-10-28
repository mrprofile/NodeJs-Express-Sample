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

                   var res = JSON.parse(results.body);

                   if(res.Results.length == 0) {
                        var error = { error : { status: 404, message: 'Show package not found' } };
                        next(error, null);
                    } else {
                        next(null, res.Results[0] );
                    }
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

    data.getPromotionItems = function(query, next) {        
        database.getDb(function(err, db){

            if(err) {
                next(err, null);
            } else {                
                var theQuery = 'WebPageUrl:"' + query.WebPageUrl + '" AND SlotName:"' + query.SlotName + '" AND ' + "PublishDate:[* TO " + moment().format('YYYY-MM-DDTHH:mm:ss.sssZ') + "]";// AND -PublishDate: 00010101000000000";

                db.rawQueryByIndex("Promotions/Index", theQuery, 0, 1, "-PublishDate",  function(err, results){      
                    next(null, JSON.parse(results.body).Results);
                });
            }
        });
    }

})(module.exports);