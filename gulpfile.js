var gulp = require('gulp');
var stylus = require('gulp-stylus');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('stylus', function() {
    return gulp.src('./public/stylusExample/*.styl')
        .pipe(sourcemaps.init())
        .pipe(stylus({compress: false}))
        .pipe(autoprefixer({
            browsers: ['> 5%'],
            cascade: true,
            remove: true
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('autoFx', function() {
    return gulp.src('./public/stylesheets/*.css')
        .pipe(sourcemaps.init())
        .pipe(autoprefixer({
            browsers: ['last 10 versions'],
            cascade: true,
            remove: false
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./public/stylesheets'))
});

gulp.task('watch', function() {
    gulp.watch('./public/stylusExample/*.styl', ['stylus']);
});

gulp.task('default', ['stylus', 'watch']);