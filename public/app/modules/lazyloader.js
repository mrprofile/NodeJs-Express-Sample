define(['require', 'jquery', 'jquery.lazyload'], function (require, jQuery, lazyload) {	

		var _opt = { effect: "fadeIn", skip_invisible: false, failure_limit: 10, selector: "img.lazy" };

		$(_opt.selector).lazyload(_opt);
	
});
