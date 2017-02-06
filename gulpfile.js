var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    sourcemaps   = require('gulp-sourcemaps'),
    plumber      = require('gulp-plumber'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify       = require('gulp-uglify'),
    concat       = require('gulp-concat'),
    imagemin     = require('gulp-imagemin'),
    clean        = require('gulp-clean'),
    jshint       = require('gulp-jshint'),
    stylish      = require('jshint-stylish'),
    purify       = require('purify-css'),
    svgSprite    = require('gulp-svg-sprite'),
    browserSync  = require('browser-sync'),
    reload       = browserSync.reload;

// Task for HTML
gulp.task('html', reload);

gulp.task('sass', function(){
	return gulp.src('./assets/scss/**/*.scss')
	.pipe(plumber())
	.pipe(sourcemaps.init())
	.pipe(sass({
		// outputStyle: 'compressed' for minify
		// outputStyle: 'expanded' for Normal
		outputStyle: 'compressed'
	}).on('error', sass.logError))
	.pipe(autoprefixer())
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('./assets/css'))
	.pipe(browserSync.stream({match: '**/*.css'}));
});

//Task for scripts knowing which one is error in js
gulp.task('jshint', function(){
  var exclude = [
    '!./assets/js/views{,/**/*.min.js}',
    '!./assets/js/main.js}'
    // '!'+ config.path.src + '/js/plugins.js'
  ],
  include = './assets/js/views/**/*.js',
  jssrc = include.concat(exclude);
  return gulp.src(jssrc)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

//Task for scripts concatenate all scripts in folder 'plugins' to plugins.js (not minified)
gulp.task('scripts', ['jshint'], function(){
  //used to make sure the sources is in order
  // var source = [
  //   config.path.src + '/js/plugins/fastclick.js'
  // ]
  // return gulp.src(source)
  return gulp.src('./assets/js/views/**/*.js')
    .pipe(plumber())
    .pipe(concat('./main.js'))
    .pipe(gulp.dest('./assets/js/'))
    .pipe(reload({stream: true}));
});



// Task Server
gulp.task('server', function(){
	browserSync.init({
		server: './',
		port: 8081,
		ui:{
			port: 8082,
		}
	});
});

gulp.task('watch', ['server'], function(){
	gulp.watch('./*.html', ['html']);
	gulp.watch('./assets/scss/**/*.scss', ['sass']);
	gulp.watch('./assets/js/**/*.js', ['scripts']);
});

gulp.task('build',['sass','scripts', 'jshint', 'server', 'watch']);