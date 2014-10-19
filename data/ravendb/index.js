(function (data) {

    var database = require("./database.js");

    data.getMessage = function(id, next) {
        database.getDb(function(err, db){
           if(err)
           {
               next(err, null);
           }
            else{
               db.getDocument("message" + "/" + id, function(err, results){
                   next(err, results);
               })
           }
        });
    }

    data.getMessages = function(channel, next) {
        database.getDb(function(err, db){
            if(err)
            {
                next(err,null);
            }
            else{
                db.queryByIndex("MessagesByChannel",{ Channel : channel}, function(err, results){
                    next(err, JSON.parse(results.body));
                })
            }
        });
    }
})(module.exports);