'use strict'

module.exports.server_path = './server/';
module.exports.databases_path = server_path + 'databases/';
module.exports.www_path = 'www/';
module.exports.public_path = www_path + 'public/';

var mysql = require(databases_path + 'mysql/setup');

module.exports.paths = {
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
    ],
    models: [
        databases_path + '/mysql/models/*.js'
    ]
};
