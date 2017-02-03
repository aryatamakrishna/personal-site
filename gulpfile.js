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
		outputStyle: 'expanded'
	}).on('error', sass.logError))
	.pipe(autoprefixer())
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('./assets/css'))
	.pipe(browserSync.stream({match: '**/*.css'}));
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
});

gulp.task('build',['sass', 'server', 'watch']);