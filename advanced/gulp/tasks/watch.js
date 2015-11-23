var gulp = require('gulp');
var gutil = require('gulp-util');
var browserifyThis = require('../lib/browserify');
var config = require('../config');
var path = require('path');
// For things outside of streams
var notifier = require('../utils/notifier');
// For streams
var notify = require('gulp-notify');

gulp.task('watch', ['build'], function () {
	gulp
		.watch(path.dirname(config.styles.src) + '/**/*.scss', ['styles'])
		.on('change', function (file) {
			var filename = path.relative(config.src, file.path);
			var type = file.type.substring(0, 1).toUpperCase() + file.type.substring(1);

			notifier({
				title: 'Rebuilt Styles',
				message: type + ': ' + filename
			});

			gutil.log(gutil.colors.green(type + ': ') + filename);
		});

	// Call our browserify task with watchify turned on
	browserifyThis(true);
});
