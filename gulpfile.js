var gulp = require('gulp');
var runSequence = require('run-sequence');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');
require('gulp-help')(gulp);
require('jshint-stylish');

gulp.task('test', 'Run all tests.', function(callback) {
    runSequence('lint',
                'setup-istanbul',
                'test-mocha',
                'report-istanbul',
                callback);
});

gulp.task('test-mocha', 'Run all mocha tests', function() {
    return gulp.src(['./test/*.test.js'])
        .pipe(mocha('spec'));
});

gulp.task('lint', 'Lint all js files.', function() {
    return gulp.src(['lib/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('setup-istanbul', false, function(callback) {
    gulp.src(['lib/**/*.js'])
        .pipe(istanbul())
        .pipe(istanbul.hookRequire())
        .on('finish', callback);
});

gulp.task('report-istanbul', false, function() {
    return gulp.src(['lib/**/*.js'])
        .pipe(istanbul.writeReports({
            dir: './coverage',
            reporters: ['text-summary', 'lcov']
        }));
});
