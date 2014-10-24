requirejs.config({
  baseUrl: 'lib',
  paths: {
    jquery: 'jquery/dist/jquery',
    flexslider: 'flexslider/jquery.flexslider',
    "jquery.lazyload": 'lazyload/jquery.lazyload',
    app: '../app'
  },
  "shim" :{
  	"jquery.lazyload" : ["jquery"]
  }
});  

// put all base stuffs here!
requirejs(['app/modules/lazyloader']);