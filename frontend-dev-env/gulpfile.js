/**
 * gulpfile.js
 *
 * - タスクを直列処理する
 * - Scss libsassでコンパイル
 * - CSS Autoprefixerで自動でプレフィックスを付与
 * - CSS コンパイル後に圧縮
 * - JavaScript webpackでJavaScriptを管理
 * - JavaScript BabelでES2015をコンパイル
 * - JavaScript コンパイル後に圧縮
 */

// gulpプラグインの読み込み
var path         = require('path');
var dev_dir      = './assets';
var assets_dir   = path.join(process.cwd(), '../www/assets');
var gulp         = require('gulp');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var cleanCss     = require('gulp-clean-css');
var rename       = require('gulp-rename');
var plumber      = require('gulp-plumber');
var notify       = require('gulp-notify');
var uglify       = require('gulp-uglify');
var karma        = require('gulp-karma');

// sass
gulp.task('sass', function(){
  gulp.src(dev_dir + '/sass/*.scss')
  .pipe(sourcemaps.init())
  .pipe(plumber({
    errorHandler: notify.onError("Error: <%= error.message %>")
  }))
  .pipe(sass({
      outputStyle: 'expanded'
  })
  .on('error', sass.logError))
  .pipe(autoprefixer({
      browsers: ['last 2 version', 'iOS >= 8.1', 'Android >= 4.0'],
      cascade: false
    }))
  //.pipe(sourcemaps.write('/map/'))
  .pipe(gulp.dest(assets_dir + '/css/'))
  .pipe(cleanCss())
  .pipe(rename({suffix: '.min'}))
  .pipe(sourcemaps.write('../map/'))
  .pipe(gulp.dest(assets_dir + '/css/'));
});


// watch
gulp.task('watch', function(){
  // css
  gulp.watch(dev_dir + '/sass/*.scss', ['sass'], function(event) {});
  gulp.watch(dev_dir + '/sass/**/*.scss', ['sass'], function(event) {});
});

gulp.task('default', ['watch']);