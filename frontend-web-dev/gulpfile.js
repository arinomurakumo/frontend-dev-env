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
var path         = require('path');
var dev_dir      = './assets';
var assets_dir   = path.join(process.cwd(), '../www/assets');
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
    gulp.src(dev_dir + '/images/*.+(jpg|jpeg|png|gif|svg)')
        .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(imagemin())
    .pipe(gulp.dest(assets_dir + '/images/'));
});

gulp.task('imageminMb', function() {
    gulp.src(dev_dir + '/images/mobile/*.+(jpg|jpeg|png|gif|svg)')
        .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(imagemin())
    .pipe(gulp.dest(assets_dir + '/images/mobile/min/'));
});

// compass
gulp.task('compass', function(){
    gulp.src(dev_dir + '/sass/*.scss')
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(compass({
        config_file: 'config.rb',
        project_path: 'frontend-web-dev',
        comments: false,
        css: assets_dir + '/css/',
        sass: dev_dir + '/sass/'
    }))
    .pipe(autoprefixer())
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(assets_dir + '/css/'));
});

gulp.task('compassAdmin', function(){
    gulp.src(dev_dir + '/sass/admin/*.scss')
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(compass({
        config_file: 'config.rb',
        project_path: 'frontend-web-dev',
        comments: false,
        css: assets_dir + '/css/admin/',
        sass: dev_dir + '/sass/admin/'
    }))
    .pipe(autoprefixer())
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(assets_dir + '/css/admin/'));
});

gulp.task('compassMb', function(){
    gulp.src(dev_dir + '/sass/mobile/*.scss')
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(compass({
        config_file: 'config.mobile.rb',
        comments: false,
        css: assets_dir + '/css/mobile/',
        sass: assets_dir + '/sass/mobile/'
    }))
    .pipe(autoprefixer())
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(assets_dir + '/css/mobile/'));
});

// jsmin
// ES6にコンパイルせず、個別にminが必要な場合はこれを呼び出す
gulp.task('jsmin', function() {
  gulp.src(assets_dir + '/js/bundle/*.js')
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(jsmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(assets_dir + '/js/bundle/'));
});

gulp.task('jsminMb', function() {
  gulp.src(assets_dir + '/js/bundle/mobile/*.js')
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(jsmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(assets_dir + '/js/bundle/mobile/'));
});

// webpack
gulp.task('webpack', function () {
    gulp.src(dev_dir + '/js/*.js')
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest(assets_dir + '/js/bundle/'))
    .pipe(jsmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(assets_dir + '/js/bundle/'));
});

// watch
gulp.task('watch', function(){
    // css
    gulp.watch(dev_dir + '/sass/*.scss', ['compass'], function(event) {});
    gulp.watch(dev_dir + '/sass/**/*.scss', ['compass'], function(event) {});
    // gulp.watch(dev_dir + '/sass/admin/*.scss', ['compassAdmin'], function(event) {});
    // gulp.watch(dev_dir + '/sass/admin/**/*.scss', ['compassAdmin'], function(event) {});
    // gulp.watch(dev_dir + '/sass/mobile/*.scss', ['compassMb'], function(event) {});
    // gulp.watch(dev_dir + '/sass/mobile/page/**/*.scss', ['compassMb'], function(event) {});

    // image
    gulp.watch('images/*.+(jpg|jpeg|png|gif|svg)', ['imagemin'], function(event) {});
    // gulp.watch(dev_dir + '/images/sp/*.+(jpg|jpeg|png|gif|svg)', ['imageminMb'], function(event) {});

    // javascript
    gulp.watch(dev_dir + '/js/*.js', ['webpack'], function(event) {});
    gulp.watch(dev_dir + '/js/admin/*.js', ['webpack'], function(event) {});
    // gulp.watch(dev_dir + '/js/*.js', ['jsmin'], function(event) {});
    // gulp.watch(dev_dir + '/js/mobile/*.js', ['jsminMb'], function(event) {});
});

gulp.task('default', ['watch']);