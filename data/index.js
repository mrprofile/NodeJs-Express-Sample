(function (data) {

    var seedData = require("./seedData.js");
    
    data.getUsers = function(next) {
        next(null, seedData.initialUsers);
    };

})(module.exports);