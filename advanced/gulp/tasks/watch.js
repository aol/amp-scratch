var gulp = require('gulp');
var gutil = require('gulp-util');
var browserifyThis = require('../lib/browserify');
var config = require('../config');
var path = require('path');
// For things outside of streams
// var notifier = require('../util/notifier');
// For streams
var notify = require('gulp-notify');

gulp.task('watch', function (cb) {
	gulp
		.watch(path.dirname(config.styles.src) + '/**/*.scss', ['styles'])
		.on('change', function (file) {
			var filename = path.relative(config.src, file.path);
			var type = file.type.substring(0, 1).toUpperCase() + file.type.substring(1);

			// I built this notifier for non-stream-based notifications, then decided
			// it was a little annoying: feel free to use it, if you like.
			/* notifier({
				title: 'Rebuilt Styles',
				message: type + ': ' + filename
			}); */

			gutil.log(gutil.colors.green(type + ': ') + filename);
		});

	// Call our browserify task with watchify turned on
	return browserifyThis({ watch: true });
});
