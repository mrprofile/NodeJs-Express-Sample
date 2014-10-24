var ravendb = require("../data/ravendb");
var data = require("../data");

function basePageModel(metaData, req) {
    this.metaData = metaData;
    this.controller = req.route.path;
    this.menuItems = {};
    this.AdKeywords = '';
    this.AdZone = 'homepage';
    this.AdSizes = '[[300,250],[300,600]]';
}

basePageModel.prototype.getDefault =  {
        "showMenuItems": function (callback) {
            data.getFeatured(function(err, results){
                callback(null, results);
            });
        }
};

module.exports = basePageModel;