var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var config = require('../config').styles;

gulp.task('styles', function () {

	gulp.src(config.src)
		// Initialize sourcemaps on the unmodified bundle of source files
		.pipe(sourcemaps.init())

		// Process and minify SCSS
		.pipe(sass()
			.on('error', function (err) {
				// You can inspect / emit the entire error if you need to for debugging
				// purposes. It's a little verbose to keep in the normal flow.
				gutil.log(gutil.colors.red('Sass error: ') + err.message);
			})
		)
		.pipe(minifyCss())
		.pipe(autoprefixer({ map: true }))

		// Write the sourcemap information to an external file
		.pipe(sourcemaps.write('./maps'))

		// Write the css files to assets
		.pipe(gulp.dest(config.dest));
});
