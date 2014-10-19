(function (database) {

    var ravendb = require("ravendb");
    var ravenUrl = "http://localhost:8080";
    var dbName = "nodejs";
    var theDb = null;

    database.getDb = function(next){
        if(!theDb)
        {
            //connect to the database
            theDb = ravendb(ravenUrl,dbName);
            next(null, theDb);
        }
        else
        {
            next(null,theDb);
        }
    }

})(module.exports);