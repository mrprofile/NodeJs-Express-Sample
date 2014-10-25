(function (data) {

    var seedData = require("./seedData.js");
    
    data.getUsers = function(next) {
        next(null, seedData.initialUsers);
    };

    data.getFeatured = function (next) {
    	next(null, seedData.shows);
    };

    data.getSliders = function(next) {
    	next(null, seedData.sliders);
    };

    data.getSchedule = function (next) {
        next(null, seedData.schedule);
    };

    data.getShortcut = function (next) {
        next(null, seedData.shortCutMap);
    };

})(module.exports);