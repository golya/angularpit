var gulp = require('gulp');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglifyjs');
var rename = require('gulp-rename');
var sass = require('gulp-sass');

var www_path = 'www/';

var paths = {
    scss: [
        www_path + 'scss/**/*.scss',
        www_path + 'scss/*.scss',
        www_path + 'modules/**/*.scss',
        www_path + 'directives/**/*.scss'
    ],
    css: [
        www_path + 'css/*.css',
        www_path + 'css/**/*.css',
        www_path + 'bower_components/angular-material/angular-material.min.css',
        www_path + 'bower_components/animate.css/animate.min.css'
    ],
    js: [
        www_path + 'app.js',
        www_path + 'modules/*/!(*-*).js',
        www_path + 'modules/*/*-*.js',
        www_path + 'directives/**/*-*.js',
        www_path + 'services/**/*-*.js',
        www_path + 'models/*.js'
    ],
    jsbundle: [
        www_path + 'bower_components/angular/angular.min.js',
        www_path + 'bower_components/angular-route/angular-route.min.js',
        www_path + 'bower_components/angular-material/angular-material.min.js',
        www_path + 'bower_components/angular-animate/angular-animate.min.js',
        www_path + 'bower_components/angular-aria/angular-aria.min.js',
        www_path + 'bower_components/lodash/lodash.min.js',
        www_path + 'bower_components/moment/min/moment.min.js',
        www_path + 'dist/js/prod.js'
    ]
};

gulp.task('sass', function () {
  return gulp.src(paths.scss)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(www_path + 'css'));
});

gulp.task('css', ['sass'], function (done) {
    gulp.src(paths.css)
        .pipe(concat('bundle.js'))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({extname: '.min.css'}))
        .pipe(gulp.dest(www_path + 'dist/css'))
        .on('end', done);
});

gulp.task('uglify', function() {
    return gulp.src(paths.js)
        .pipe(uglify('prod.js'))
        .pipe(gulp.dest(www_path + 'dist/js/'));
});

gulp.task('buildjs', ['uglify'], function(done) {
    gulp.src(paths.jsbundle)
        .pipe(concat('bundle.js'))
        .pipe(rename({extname: '.min.js'}))
        .pipe(gulp.dest(www_path + 'dist/js'))
        .on('end', done);
});

gulp.task('watch', function () {
    gulp.watch(paths.scss, ['css']);
    gulp.watch(paths.js, ['buildjs']);
});

gulp.task('build', ['buildjs', 'css'])
