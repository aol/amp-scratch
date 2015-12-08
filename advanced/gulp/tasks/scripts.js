var gulp = require('gulp');
var browserifyThis = require('../lib/browserify');

gulp.task('scripts', function (cb) {
	return browserifyThis({
		watch: false
	});
});
