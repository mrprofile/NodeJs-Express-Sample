var ravendb = require("../data/ravendb");
var data = require("../data");

function basePageModel(metaData, req) {
    this.metaData = metaData;
    this.controller = req.route.path;
    this.menuItems = {};
}

basePageModel.prototype.getDefault =  {
        "showMenuItems": function (callback) {
            data.getFeatured(function(err, results){
                callback(null, results);
            });
        }
};

module.exports = basePageModel;