(function() {
    String.prototype.count = function(value) {
        return (this.length - this.replace(new RegExp(value,"g"), '').length) / value.length;
    }
})(module.exports);