var gulp = require('gulp');
var vulcanize = require('gulp-vulcanize');
var size = require('gulp-size');
var clean = require('gulp-clean');
var minifyInline = require('gulp-minify-inline');
var minifyHtml = require('gulp-minify-html');
var browserSync = require("browser-sync").create();

var BuildFiles = [
    './app/polymer/elements.html',
    './app/index.html',
    './app/bower_components/webcomponentsjs/webcomponents-lite.min.js'
];

var Html = {
    empty: false,        // KEEP empty attributes
    cdata: true,        // KEEP CDATA from scripts
    comments: false,     // KEEP comments
    ssi: true,          // KEEP Server Side Includes
    conditionals: true, // KEEP conditional internet explorer comments
    spare: true,        // KEEP redundant attributes
    quotes: true,       // KEEP arbitrary quotes
    loose: true         // KEEP one whitespace
};

gulp.task('vulcanize', function () {
    return gulp.src('app/elements/elements.html')
        .pipe(vulcanize({
            stripComments: true,
            inlineCss: true,
            inlineScripts: true
        }))
        .pipe(minifyInline())
        .pipe(minifyHtml(Html))
        .pipe(gulp.dest('app/polymer/'))
        .pipe(size({title: 'Vulcanize'}));
});

gulp.task('serve', ['vulcanize'], function() {
    browserSync.init({
        server: "./app"
    });
    gulp.watch(["app/*.html", "app/polymer/elements.html"]).on('change', browserSync.reload);
    gulp.watch(["app/elements/**/*.html", "app/elements/*.html"], ['vulcanize']);
});

gulp.task('clean', function(){
  return gulp.src(['dist/*'], {read:false})
  .pipe(clean());
});

gulp.task('build', function(){
    return gulp.src(BuildFiles, { base: './app/' })
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['serve']);
