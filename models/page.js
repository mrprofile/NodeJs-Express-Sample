var ravendb = require("../data/ravendb");

function basePageModel(metaData, req) {
    this.metaData = metaData;
    this.controller = req.route.path;
    this.menuItems = {};
}

basePageModel.prototype.getDefault =  {
        "showMenuItems": function (callback) {
            ravendb.getShowMenuItems(function(err, results){
                callback(null, results);
            });
        }
};

module.exports = basePageModel;