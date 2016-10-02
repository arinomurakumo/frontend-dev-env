/**
 * gulpfile.js
 *
 *
 * - タスクを直列処理する
 * - ScssはCompassで自動コンパイル
 * - cssはAutoprefixerで自動でプレフィックスを付与
 * - css/imageのデータ容量を圧縮する
 * - BABELでJavaScriptをES6で記述も可能
 * - ES6のビルドはwebpackでJavaScriptを管理
 * - ES5にビルドしたjsファイルを圧縮
 */

// gulpプラグインの読み込み
var path         = 'www/assets';
var gulp         = require('gulp');
var imagemin     = require('gulp-imagemin');
var compass      = require('gulp-compass');
var autoprefixer = require('gulp-autoprefixer');
var cssmin       = require('gulp-cssmin');
var jsmin        = require('gulp-jsmin');
var rename       = require('gulp-rename');
var plumber      = require('gulp-plumber');
var notify       = require('gulp-notify');
var webpack      = require('gulp-webpack');

// imageMinTask
gulp.task('imagemin', function() {
    gulp.src(path + '/images/*.+(jpg|jpeg|png|gif|svg)')
        .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(imagemin())
    .pipe(gulp.dest(path + '/images/min/'));
});

gulp.task('imageminMb', function() {
    gulp.src(path + '/images/mobile/*.+(jpg|jpeg|png|gif|svg)')
        .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(imagemin())
    .pipe(gulp.dest(path + '/images/mobile/min/'));
});

// compass
gulp.task('compass', function(){
    gulp.src(path + '/sass/*.scss')
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(compass({
        config_file: 'config.rb',
        comments: false,
        css: path + '/css/',
        sass: path + '/sass/'
    }))
    .pipe(autoprefixer())
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(path + '/css/'));
});

gulp.task('compassAdmin', function(){
    gulp.src(path + '/sass/admin/*.scss')
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(compass({
        config_file: 'config.admin.rb',
        comments: false,
        css: path + '/css/admin/',
        sass: path + '/sass/admin/'
    }))
    .pipe(autoprefixer())
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(path + '/css/admin/'));
});

gulp.task('compassMb', function(){
    gulp.src(path + '/sass/mobile/*.scss')
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(compass({
        config_file: 'config.mobile.rb',
        comments: false,
        css: path + '/css/mobile/',
        sass: path + '/sass/mobile/'
    }))
    .pipe(autoprefixer())
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(path + '/css/mobile/'));
});

// jsmin
// ES6にコンパイルせず、個別にminが必要な場合はこれを呼び出す
gulp.task('jsmin', function() {
  gulp.src(path + '/js/es6/*.js')
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(jsmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(path + '/js/es6/'));
});

gulp.task('jsminMb', function() {
  gulp.src(path + '/js/es6/mb/*.js')
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(jsmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(path + '/js/es6/mb/'));
});

// webpack
gulp.task('webpack', function () {
    gulp.src(path + '/js/*.js')
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest(path + '/js/es6/'))
    .pipe(jsmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(path + '/js/es6/'));
});

// watch
gulp.task('watch', function(){
    // css
    gulp.watch(path + '/sass/*.scss', ['compass'], function(event) {});
    gulp.watch(path + '/sass/**/*.scss', ['compass'], function(event) {});
    // gulp.watch(path + '/sass/admin/*.scss', ['compassAdmin'], function(event) {});
    // gulp.watch(path + '/sass/mobile/*.scss', ['compassMb'], function(event) {});
    // gulp.watch(path + '/sass/mobile/page/**/*.scss', ['compassMb'], function(event) {});

    // image
    gulp.watch(path + '/images/*.+(jpg|jpeg|png|gif|svg)', ['imagemin'], function(event) {});
    // gulp.watch(path + '/images/sp/*.+(jpg|jpeg|png|gif|svg)', ['imageminMb'], function(event) {});

    // javascript
    gulp.watch(path + '/js/*.js', ['webpack'], function(event) {});
    // gulp.watch(path + '/js/*.js', ['jsmin'], function(event) {});
    // gulp.watch(path + '/js/mb/*.js', ['jsminMb'], function(event) {});
});

gulp.task('default', ['watch']);