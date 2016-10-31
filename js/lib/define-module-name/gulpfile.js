var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('default', function() {
    gulp.src('define-module-name.js')
        .pipe(uglify())
        .pipe(rename('define-module-name.min.js'))
        .pipe(gulp.dest('./'))
    ;
});