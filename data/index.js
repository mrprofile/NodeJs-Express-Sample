(function (data) {

    var seedData = require("./seedData.js");
    
    data.getUsers = function(next) {
        next(null, seedData.initialUsers);
    };

    data.getFeatured = function (next) {
    	next(null, seedData.shows);
    };

})(module.exports);