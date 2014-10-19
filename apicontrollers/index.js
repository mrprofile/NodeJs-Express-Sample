(function (controllers) {

    var userController = require("./userController");

    controllers.init = function(app) {
        userController.init(app);
    };
    
})(module.exports);