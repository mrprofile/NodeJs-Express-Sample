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
})(module.exports);