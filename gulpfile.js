var gulp = require('gulp');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglifyjs');
var rename = require('gulp-rename');
var sass = require('gulp-sass');

var paths = {
    scss: [
        './www/scss/**/*.scss',
        './www/scss/*.scss',
        './www/modules/**/*.scss',
        './www/directives/**/*.scss'
    ],
    css: [
        './www/css/*.css',
        './www/css/**/*.css',
        './www/bower_components/angular-material/angular-material.min.css',
        './www/bower_components/animate.css/animate.min.css'
    ],
    js: [
        './www/app.js',
        './www/modules/*/!(*-*).js',
        './www/modules/*/*-*.js',
        './www/directives/**/*-*.js',
        './www/services/**/*-*.js',
        './www/models/*.js'
    ],
    jsbundle: [
        './www/bower_components/angular/angular.min.js',
        './www/bower_components/angular-route/angular-route.min.js',
        './www/bower_components/angular-material/angular-material.min.js',
        './www/bower_components/angular-animate/angular-animate.min.js',
        './www/bower_components/angular-aria/angular-aria.min.js',
        './www/bower_components/lodash/lodash.min.js',
        './www/bower_components/moment/min/moment.min.js',
        './www/dist/js/prod.js'
    ]
};

gulp.task('sass', function () {
  return gulp.src(paths.scss)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('www/css'));
});

gulp.task('css', ['sass'], function (done) {
    gulp.src(paths.css)
        .pipe(concat('bundle.js'))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({extname: '.min.css'}))
        .pipe(gulp.dest('www/dist/css'))
        .on('end', done);
});

gulp.task('uglify', function() {
    return gulp.src(paths.js)
        .pipe(uglify('prod.js'))
        .pipe(gulp.dest('www/dist/js/'));
});

gulp.task('buildjs', ['uglify'], function(done) {
    gulp.src(paths.jsbundle)
        .pipe(concat('bundle.js'))
        .pipe(rename({extname: '.min.js'}))
        .pipe(gulp.dest('www/dist/js'))
        .on('end', done);
});

gulp.task('watch', function () {
    gulp.watch(paths.scss, ['css']);
    gulp.watch(paths.js, ['buildjs']);
});

gulp.task('build', ['buildjs', 'css'])
