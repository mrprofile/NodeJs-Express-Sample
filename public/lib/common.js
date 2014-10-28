requirejs.config({
  baseUrl: '/lib',
  paths: {
    jquery: 'jquery/dist/jquery',
    flexslider: 'flexslider/jquery.flexslider',
    "jquery.lazyload": 'lazyload/jquery.lazyload',
    "jquery.ddslick" : 'ddslick/jquery.ddslick',
    "jquery.ui" : 'jquery-ui-1.10.3.custom',
    app: '../app'
  },
  "shim" :{
    "jquery.ui" : ["jquery"],
  	"jquery.lazyload" : ["jquery"],
    "jquery.ddslick" : ["jquery"]
  }
});  

// put all base stuffs here!
requirejs(['app/modules/lazyloader']);