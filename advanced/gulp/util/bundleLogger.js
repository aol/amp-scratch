/* bundleLogger
	 ------------
	 Provides gulp style logs to the bundle method in browserify.js
	 */

var gutil = require('gulp-util');
var prettyHrtime = require('pretty-hrtime');
var path = require('path');
var startTime;

module.exports = {
	start: function (src) {
		startTime = process.hrtime();
		gutil.log('Bundling', gutil.colors.green(src) + '...');
	},

	watch: function (bundleName) {
		gutil.log('Watching files required by', gutil.colors.yellow(bundleName));
	},

	end: function (src, dest) {
		var taskTime = process.hrtime(startTime);
		var prettyTime = prettyHrtime(taskTime);
		gutil.log('Bundled', gutil.colors.green(src), '→', gutil.colors.yellow(dest + '/' + path.basename(src)), 'in', gutil.colors.magenta(prettyTime));
	}
};
