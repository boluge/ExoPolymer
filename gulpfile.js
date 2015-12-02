var gulp = require('gulp');
var vulcanize = require('gulp-vulcanize');
var size = require('gulp-size');
var minifyInline = require('gulp-minify-inline');
var browserSync = require("browser-sync").create();

gulp.task('vulcanize', function () {
    return gulp.src('app/elements/elements.html')
        .pipe(vulcanize({
            abspath: '',
            excludes: [],
            stripComments: true,
            inlineCss: true,
            inlineScripts: true
        }))
        .pipe(minifyInline())
        .pipe(gulp.dest('app/dest/'))
        .pipe(size({title: 'Vulcanize'}));
});

gulp.task('serve', ['vulcanize'], function() {
    browserSync.init({
        server: "./app"
    });
    gulp.watch(["app/*.html", "app/dest/elements.html"]).on('change', browserSync.reload);
    gulp.watch(["app/elements/**/*.html", "app/elements/*.html"], ['vulcanize']);
});

gulp.task('default', ['serve']);
