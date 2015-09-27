'use strict';

var babel = require('gulp-babel');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var gulp = require('gulp');
var jasmine = require('gulp-jasmine');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');

gulp.task('browserify', ['babel-src'], function () {
   return browserify({
         entries: ['./main.js'],
         basedir: './build/src',
         paths: './node_modules/react',
         debug: true
      })
      .bundle()
      .on('error', function (err) { console.log('Error: ' + err.message); })
      .pipe(source('main.js'))
      .pipe(buffer())
      .pipe(uglify())
      .pipe(gulp.dest('./public/'));
});

gulp.task('babel-src', function () {
   return gulp.src('./resources/assets/javascript/**/*.js')
      .pipe(babel())
      .pipe(gulp.dest('./build/src/'));
});

gulp.task('babel-test', function () {
   return gulp.src('./tests/javascript/*.js')
      .pipe(babel())
      .pipe(gulp.dest('./build/test/'));
});

gulp.task('test', ['babel-src', 'babel-test'], function () {
   console.log('Running test task');
   return gulp.src('./build/test/*.js')
      .pipe(jasmine());
});

gulp.task('stylesheets', function () {
   return gulp.src('./resources/assets/stylesheets/*.css')
      .pipe(gulp.dest('./public/'));
});

gulp.task('prepare', ['test', 'browserify', 'stylesheets']);

gulp.task('default', ['browserify', 'stylesheets']);
