var gulp = require('gulp');
var runSequence = require('run-sequence');
var to5 = require('gulp-babel');
var paths = require('../paths');
var compilerOptions = require('../babel-options');
var assign = Object.assign || require('object.assign');
var rename = require('gulp-rename');

var copyPlugins = function() {
  var newPlugins = [];
  if (compilerOptions.plugins) {
    newPlugins = compilerOptions.plugins.slice();
  }

  return newPlugins;
};

gulp.task('build-es6', function () {
  return gulp.src(paths.source)
    .pipe(gulp.dest(paths.output + 'es6'));
});

gulp.task('build-commonjs', function () {
  var newPlugins = copyPlugins();
  newPlugins.push('transform-es2015-modules-commonjs');
  return gulp.src(paths.source)
    .pipe(to5(assign({}, compilerOptions, {plugins: newPlugins})))
    .pipe(gulp.dest(paths.output + 'commonjs'));
});

gulp.task('build-amd', function () {
  var newPlugins = copyPlugins();
  newPlugins.push('transform-es2015-modules-amd');
  return gulp.src(paths.source)
    .pipe(to5(assign({}, compilerOptions, {plugins: newPlugins})))
    .pipe(gulp.dest(paths.output + 'amd'));
});

gulp.task('build-system', function () {
  var newPlugins = copyPlugins();
  newPlugins.push('transform-es2015-modules-systemjs');
  return gulp.src(paths.source)
    .pipe(to5(assign({}, compilerOptions, {plugins: newPlugins})))
    .pipe(gulp.dest(paths.output + 'system'));
});

gulp.task('build', function(callback) {
  return runSequence(
    'clean',
    ['build-es6', 'build-commonjs', 'build-amd', 'build-system'],
    callback
  );
});
