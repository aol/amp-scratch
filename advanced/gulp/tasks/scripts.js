var gulp = require('gulp');
var browserifyThis = require('../lib/browserify');

gulp.task('scripts', function () {
	browserifyThis();
});
