/**
 * gulpfile.js
 */

// init
import path         from 'path';
import gulp         from 'gulp';
import sass         from 'gulp-sass';
import sourcemaps   from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';
import cleanCss     from 'gulp-clean-css';
import rename       from 'gulp-rename';
import plumber      from 'gulp-plumber';
import notify       from 'gulp-notify';
import uglify       from 'gulp-uglify';


const  dev_dir      = './assets';
const  assets_dir   = path.join(process.cwd(), '../www/assets');
const paths = {
  styles: {
    src:    dev_dir + '/sass/*.scss',
    lower:  dev_dir + '/sass/**/*.scss',
    dest:   assets_dir + '/css/'
  },
};

// Sass
export function styles() {
  return gulp.src(paths.styles.src)
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
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(cleanCss())
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('../map/'))
    .pipe(gulp.dest(paths.styles.dest));
}

// Watch
function watchFiles() {
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.styles.lower, styles);
}
export { watchFiles as watch };

// Build
const build = gulp.series(gulp.parallel(styles));
gulp.task('build', build);

// Export
export default build;