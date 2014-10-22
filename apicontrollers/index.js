(function (controllers) {

    var userController = require("./userController");
    var sliderController = require("./sliderController");

    controllers.init = function(app) {
        userController.init(app);
        sliderController.init(app);
    };
    
})(module.exports);