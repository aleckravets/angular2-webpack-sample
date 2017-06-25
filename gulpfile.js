var gulp = require('gulp');
var gutil = require('gulp-util');
var del = require('del');
var webpack = require('webpack');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var runSequence = require('run-sequence');
var rev = require("gulp-rev");
var revReplace = require('gulp-rev-replace');

function runWebpack(config, callback) {
	var initBuild = true;
	webpack(config, function(err, stats) {
		// if (err) throw new gutil.PluginError("webpack", err);
		if (stats.hasErrors() || stats.hasWarnings()) {
			gutil.log("[webpack]", stats.toString({
				chunks: false,
				colors: true,
				exclude: ["node_modules"]
			}));
		}
		if (callback) {
			if (config.watch) {
				// let the callback know whether it is a initial build in the watch mode
				callback(initBuild);
				initBuild = false;
			}
			else {
				callback();
			}
		}
	});
}

gulp.task('clean', function(callback) {
	return del(['dist'], callback);
});

gulp.task('styles', function () {
	return gulp.src(['./src/app/components/**/*.scss'])
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(concat('app.css'))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./dist'));
});

gulp.task('theme', function () {
	return gulp.src(['./src/app/theme.scss'])
		.pipe(sass().on('error', sass.logError))
		.pipe(concat('theme.css'))
		.pipe(gulp.dest('./dist'));
});

gulp.task('styles:watch', ['styles', 'theme'], function () {
	gulp.watch('./src/app/components/**/*.scss', ['styles']);
	gulp.watch('./src/app/theme.scss', ['theme']);
});

gulp.task("webpack", function(callback) {
	var config = require('./webpack.config.js');
	runWebpack(config, callback);
});

// run webpack in the watch mode, using the callback to finish the task after initial build
gulp.task("webpack:watch", function(callback) {
	var config = require('./webpack.config.js');
	config.watch = true;
	runWebpack(config, function(initBuild) {
		if (callback && initBuild) callback();
	});
});

gulp.task("server", function(callback) {
	var bsConfig = require('./bs-config.js');
	browserSync.init(bsConfig, callback);
});

// rev the assets in the dist folder
 gulp.task("rev", function(){
	return gulp.src(["dist/**/*.css", "dist/**/*.js"])
		.pipe(rev())
		.pipe(gulp.dest('./dist'))
		.pipe(rev.manifest())
		.pipe(gulp.dest('./dist'))
});

// copy index.html to dist
gulp.task("index", function(){
	return gulp.src("./src/index.html")
		.pipe(gulp.dest('./dist'));
});

// copy index.html to dist replacing the paths to the revved files
gulp.task("index:rev", function(){
	var manifest = gulp.src("./dist/rev-manifest.json");
	return gulp.src("./src/index.html")
		.pipe(revReplace({manifest: manifest}))
		.pipe(gulp.dest('./dist'));
});

gulp.task('start', function(callback) {
	runSequence('clean', ['webpack:watch', 'styles:watch'], 'index', 'server', callback);
});

gulp.task('build', function(callback) {
	runSequence('clean', ['webpack', 'styles'], 'rev', 'index:rev', callback);
});

gulp.task('default', ['build']);
