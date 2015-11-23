var gulp = require('gulp');
var clean = require('gulp-clean');
var config = require('../config');

// Clean the assets folder. We want to make sure we're never dealing with
// source files.
gulp.task('clean', function () {
	return gulp.src([config.dest], {
		// Since we don't need to read the contents of the files in this stream
		// after cleaning, turning this off makes the task faster
		read: false
	})
		.pipe(clean());
});
