var gulp = require('gulp');
var debug = require('gulp-debug');
var gutil = require('gulp-util');
var gFilter = require('gulp-filter');
var handleErrors = require('../util/handleErrors');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var size = require('gulp-size');
var config = require('../config').styles;

gulp.task('styles', function () {

	return gulp.src(config.src)

		// Initialize sourcemaps on the unmodified bundle of source files
		.pipe(sourcemaps.init())

		// Process and minify SCSS
		.pipe(sass()
			.on('error', handleErrors)
		)
		.pipe(minifyCss())
		.pipe(autoprefixer({ map: true }))

		// Write the sourcemap information to an external file
		.pipe(sourcemaps.write('./maps'))

		// Write the css files to assets
		.pipe(gulp.dest(config.dest))

		// Filter out sourcemaps
		.pipe(gFilter(['*', '!*.map']))

		.pipe(size({
			showFiles: true
		}))
		.pipe(size({
			showFiles: true,
			gzip: true
		}));
});
