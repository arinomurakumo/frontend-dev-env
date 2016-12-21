/**
 * gulpfile.js
 *
 *
 * - タスクを直列処理する
 * - Scssはlibsassで自動コンパイル
 * - cssはAutoprefixerで自動でプレフィックスを付与
 * - css/imageのデータ容量を圧縮する
 * - BABELでJavaScriptをES2015で記述も可能
 * - ES2015のビルドはwebpackでJavaScriptを管理
 * - ES5にビルドしたjsファイルを圧縮
 */

// gulpプラグインの読み込み
var path         = require('path');
var dev_dir      = './assets';
var assets_dir   = path.join(process.cwd(), '../www/assets');
var gulp         = require('gulp');
var imagemin     = require('gulp-imagemin');
var sass         = require('gulp-sass');
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
    .pipe(gulp.dest(assets_dir + '/images/mobile/'));
});

// sass
gulp.task('sass', function(){
    gulp.src(dev_dir + '/sass/*.scss')
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(sass({
        outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 version', 'iOS >= 8.1', 'Android >= 4.0'],
        cascade: false
      }))
    .pipe(gulp.dest(assets_dir + '/css/'))
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(assets_dir + '/css/'));
});

gulp.task('sassAdmin', function(){
    gulp.src(dev_dir + '/sass/admin/*.scss')
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(sass({
        outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 version', 'iOS >= 8.1', 'Android >= 4.0'],
        cascade: false
      }))
    .pipe(gulp.dest(assets_dir + '/css/admin/'))
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(assets_dir + '/css/admin/'));
});

gulp.task('sassMobile', function(){
    gulp.src(dev_dir + '/sass/mobile/*.scss')
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(sass({
        outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 version', 'iOS >= 8.1', 'Android >= 4.0'],
        cascade: false
      }))
    .pipe(gulp.dest(assets_dir + '/css/mobile/'))
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
    gulp.watch(dev_dir + '/sass/*.scss', ['sass'], function(event) {});
    gulp.watch(dev_dir + '/sass/**/*.scss', ['sass'], function(event) {});
    // gulp.watch(dev_dir + '/sass/admin/*.scss', ['sassAdmin'], function(event) {});
    // gulp.watch(dev_dir + '/sass/admin/**/*.scss', ['sassAdmin'], function(event) {});
    // gulp.watch(dev_dir + '/sass/mobile/*.scss', ['sassMobile'], function(event) {});
    // gulp.watch(dev_dir + '/sass/mobile/**/**/*.scss', ['sassMobile'], function(event) {});

    // image
    gulp.watch(dev_dir + 'images/*.+(jpg|jpeg|png|gif|svg)', ['imagemin'], function(event) {});
    // gulp.watch(dev_dir + '/images/sp/*.+(jpg|jpeg|png|gif|svg)', ['imageminMb'], function(event) {});

    // javascript
    gulp.watch(dev_dir + '/js/*.js', ['webpack'], function(event) {});
    gulp.watch(dev_dir + '/js/admin/*.js', ['webpack'], function(event) {});
    // gulp.watch(dev_dir + '/js/*.js', ['jsmin'], function(event) {});
    // gulp.watch(dev_dir + '/js/mobile/*.js', ['jsminMb'], function(event) {});
});

gulp.task('default', ['watch']);