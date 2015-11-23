var gulp = require('gulp');
var browserifyThis = require('../lib/browserify');
var config = require('../config');

gulp.task('watch', ['build'], function () {
	gulp.watch(path.dirname(config.styles.src) + '/**/*.scss', ['styles']);

	// Call our browserify task with watchify turned on
	browserifyThis(true);
});
