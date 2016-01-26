var gulp = require('gulp');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglifyjs');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var mocha = require('gulp-mocha');

var www_path = 'www/';
var public_path = www_path + 'public/';

var paths = {
    scss: [
        www_path + 'scss/**/*.scss',
        www_path + 'scss/*.scss',
        public_path + 'modules/**/*.scss',
        public_path + 'directives/**/*.scss'
    ],
    css: [
        public_path + 'css/*.css',
        public_path + 'css/**/*.css',
        public_path + 'bower_components/angular-material/angular-material.min.css',
        public_path + 'bower_components/animate.css/animate.min.css'
    ],
    js: [
        public_path + 'app.js',
        public_path + 'modules/*/!(*-*).js',
        public_path + 'modules/*/*-*.js',
        public_path + 'directives/**/*-*.js',
        public_path + 'services/**/*-*.js',
        public_path + 'models/*.js'
    ],
    jsbundle: [
        public_path + 'bower_components/angular/angular.min.js',
        public_path + 'bower_components/angular-route/angular-route.min.js',
        public_path + 'bower_components/angular-material/angular-material.min.js',
        public_path + 'bower_components/angular-animate/angular-animate.min.js',
        public_path + 'bower_components/angular-aria/angular-aria.min.js',
        public_path + 'bower_components/lodash/lodash.min.js',
        public_path + 'bower_components/moment/min/moment.min.js',
        public_path + 'dist/js/prod.js'
    ]
};

gulp.task('sass', function () {
  return gulp.src(paths.scss)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(public_path + 'css'));
});

gulp.task('css', ['sass'], function (done) {
    gulp.src(paths.css)
        .pipe(concat('bundle.js'))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({extname: '.min.css'}))
        .pipe(gulp.dest(public_path + 'dist/css'))
        .on('end', done);
});

gulp.task('uglify', function() {
    return gulp.src(paths.js)
        .pipe(uglify('prod.js'))
        .pipe(gulp.dest(public_path + 'dist/js/'));
});

gulp.task('buildjs', ['uglify'], function(done) {
    gulp.src(paths.jsbundle)
        .pipe(concat('bundle.js'))
        .pipe(rename({extname: '.min.js'}))
        .pipe(gulp.dest(public_path + 'dist/js'))
        .on('end', done);
});

gulp.task('stest', function () {
    return gulp.src('server/test/*.js', {read: false})
        .pipe(mocha({reporter: 'spec'}));
});

gulp.task('watch', function () {
    gulp.watch(paths.scss, ['css']);
    gulp.watch(paths.js, ['buildjs']);
});

gulp.task('build', ['buildjs', 'css'])
