'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),

    srcPath = 'src/',
    buildPath = 'target/';

// =================================================
// ===================== TASKS =====================
// =================================================

//------- IMAGES
gulp.task('img', function () {
    gulp.src(srcPath + 'img/*.*')
        .pipe(gulp.dest(buildPath + 'img'));
});

//------- SCRIPTS
var jsInput = [
        srcPath + 'js/*.js'
    ],
    jsOutput = buildPath + 'js';

gulp.task('js', function () {
    gulp
        .src(jsInput)
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest(jsOutput));

    return gulp;
});

//------- CSS (SASS)
var sassInput = srcPath + 'scss/*.scss',
    sassOutput = buildPath + 'css',
    sassOptions = {
        errLogToConsole: true,
        outputStyle:     'expanded'
    };

gulp.task('sass', function () {
    console.log('Compiling Sass...');
    gulp
        .src(sassInput)
        .pipe(concat('styles.js'))
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(gulp.dest(sassOutput));
    return gulp;
});

//------- HTML
var htmlInput = srcPath + '*.html',
    htmlOutput = buildPath;

gulp.task('html', function () {
    gulp.src(htmlInput)
        .pipe(gulp.dest(htmlOutput));
});


//------- PROCESS --------
gulp.task('default', ['js', 'html', 'img', 'sass'], function () {
    console.log('Default gulp process.');
});

gulp.task('watch', ['js', 'html', 'sass'], function () {
    gulp.watch(jsInput, ['js']);
    gulp.watch(sassInput, ['sass']);
    gulp.watch(htmlInput, ['html']);
});
