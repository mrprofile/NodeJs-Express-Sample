(function (database) {

    var ravendb = require("ravendb");    
    var ravenUrl = "http://10.128.36.191:8080";
    var dbName = "esqtv";
    var theDb = null;

    ravendb.Database.prototype.queryByIndex = function(index, query, start, count, sort, cb) {
        var url;
        if (start == null) {
        start = 0;
        }
        if (count == null) {
        count = 25;
        }
        if (typeof start === 'function') {
        cb = start;
        start = null;
        count = null;
        } else if (typeof count === 'function') {
        cb = count;
        count = null;
        }
        url = "" + (this.getIndexUrl(index)) + "?start=" + start + "&pageSize=" + count + "&aggregation=None" + "&sort=" + sort;
        if (query != null) {
        url += "&query=" + (this.luceneQueryArgs(query));
        }
        return this.apiGet(url, cb);
    };

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