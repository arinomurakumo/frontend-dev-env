/**
 * gulpfile.js
 *
 *
 * - タスクを直列処理する
 * - Scssはlibsassで自動コンパイル
 * - cssはAutoprefixerで自動でプレフィックスを付与
 * - cssを圧縮する
 * - BABELでJavaScriptをES2015で記述も可能
 * - ES2015のビルドはwebpackでJavaScriptを管理
 * - ES5にビルドしたjsファイルを圧縮
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
var webpack      = require('gulp-webpack');

// sass
gulp.task('sass', function(){
  gulp.src(dev_dir + '/sass/*.scss')
  .pipe(sourcemaps.init())
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
  //.pipe(sourcemaps.write('/map/'))
  .pipe(gulp.dest(assets_dir + '/css/'))
  .pipe(cleanCss())
  .pipe(rename({suffix: '.min'}))
  .pipe(sourcemaps.write('../map/'))
  .pipe(gulp.dest(assets_dir + '/css/'));
});

// webpack
gulp.task('webpack', function () {
  gulp.src(dev_dir + '/js/*.js')
  .pipe(plumber({
    errorHandler: notify.onError("Error: <%= error.message %>")
  }))
  .pipe(webpack(require('./webpack.config.js')))
  .pipe(gulp.dest(assets_dir + '/js/bundle/'))
  .pipe(uglify({preserveComments: 'some'}))
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest(assets_dir + '/js/bundle/'));
});

// watch
gulp.task('watch', function(){
  // css
  gulp.watch(dev_dir + '/sass/*.scss', ['sass'], function(event) {});
  gulp.watch(dev_dir + '/sass/**/*.scss', ['sass'], function(event) {});

  // javascript
  gulp.watch(dev_dir + '/js/*.js', ['webpack'], function(event) {});
  gulp.watch(dev_dir + '/js/**/.js', ['webpack'], function(event) {});
});

gulp.task('default', ['watch']);