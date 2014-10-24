define(["require", "jquery", 'app/modules/slider'],function (require, $, slider){
	console.log("i'm loaded");
	slider.Start('.flexslider', $, [], []);	
});