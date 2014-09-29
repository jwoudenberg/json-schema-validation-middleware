var gulp = require('gulp');
var runSequence = require('run-sequence');
var jshint = require('gulp-jshint');
require('gulp-help')(gulp);
require('jshint-stylish');

gulp.task('test', 'Run all tests.', function(callback) {
    runSequence('lint',
                callback);
});

gulp.task('lint', 'Lint all js files.', function() {
    return gulp.src(['./**/*.js', '!./node_modules/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
});
