(function() {
    String.prototype.count = function(value) {
        return (this.length - this.replace(new RegExp(value,"g"), '').length) / value.length;
    }

    if (typeof String.prototype.startsWith != 'function') {
	  String.prototype.startsWith = function (str){
	    return this.slice(0, str.length) == str;
	  };
	}
})(module.exports);