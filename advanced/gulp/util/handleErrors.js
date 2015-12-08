var notify = require('gulp-notify');
var config = require('../config');

module.exports = function () {

	var args = Array.prototype.slice.call(arguments);

	// Send error to notification center with gulp-notify
	notify.onError({
		title: 'Compile Error',
		message: '<%= error %>',
		icon: config.notifier.icon
	}).apply(this, args);

	// Keep gulp from hanging on this task
	this.emit('end');
};
