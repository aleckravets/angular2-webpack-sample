var gulp = require('gulp');
var gutil = require('gulp-util');
var del = require('del');
var webpack = require('webpack');
var browserSync = require('browser-sync').create();

function runWebpack(config, callback, updateCallback) {
    var firstBuild = true;
    webpack(config, function(err, stats) {
        if (err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            colors: true,
            exclude: ["node_modules"]
        }));
        if (firstBuild) {
            callback();
            firstBuild = false;
        }
        else {
            updateCallback();
        }
    });
}

gulp.task('clean', function(cb) {
    return del(['dist'], cb);
});

gulp.task("build", ['clean'], function(callback) {
    var config = require('./webpack-config/webpack.prod');
    runWebpack(config, callback);
});

gulp.task("build:watch", ['clean'], function(callback) {
    var config = require('./webpack-config/webpack.dev');
    runWebpack(config, callback, function() {
        // browserSync.reload();
   });
});

gulp.task('start', ['build:watch'], function() {
    var config = require('./bs-config.json');
    browserSync.init(config);
});

gulp.task('default', ['build']);