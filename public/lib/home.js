requirejs.config({
	baseUrl: 'lib',
	paths: {
		jquery: 'jquery/dist/jquery',
		flexslider: 'flexslider/jquery.flexslider',
		app: '../app'
	}
});

define(function (require){

	var $ = require('jquery');
	var slider = require('app/modules/slider');

	 console.log(slider);

	 slider.Start('.flexslider', $, [], [])

	//  $('.flexslider').flexslider({
 //        useCss: false, animation: "slide", slideshow: false, animationLoop: true, smoothHeight: true,
 //    });

});