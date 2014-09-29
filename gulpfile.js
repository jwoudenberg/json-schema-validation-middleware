var gulp = require('gulp');
var runSequence = require('run-sequence');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
require('gulp-help')(gulp);
require('jshint-stylish');

gulp.task('test', 'Run all tests.', function(callback) {
    runSequence('lint',
                'test-mocha',
                callback);
});

gulp.task('test-mocha', 'Run all mocha tests', function() {
    return gulp.src(['./test/*.test.js'])
        .pipe(mocha('spec'));
});

gulp.task('lint', 'Lint all js files.', function() {
    return gulp.src(['./**/*.js', '!./node_modules/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
});
