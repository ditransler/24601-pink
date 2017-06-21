"use strict";

var gulp = require("gulp");

var run = require("run-sequence");
var del = require("del");
var plumber = require("gulp-plumber");
var rename = require("gulp-rename");

var server = require("browser-sync").create();

var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var mqpacker = require("css-mqpacker");
var cssminify = require("gulp-csso");

var jsuglify = require('gulp-uglify');

var imagemin = require("gulp-imagemin");
var svgmin = require("gulp-svgmin");

gulp.task("clean", function () {
  return del("build");
});

gulp.task("copy", function () {
  return gulp.src([
    "fonts/**/*.{woff,woff2}",
    "img/**/*.{png,jpg,gif,svg}",
    "js/**/*.js",
    "*.html"
  ], {
    base: "."
  })
  .pipe(gulp.dest("build"));
});

gulp.task("html:copy", function () {
  return gulp.src("*.html")
    .pipe(gulp.dest("build"));
});

gulp.task("html:update", ["html:copy"], function (done) {
  server.reload();
  done();
});

gulp.task("style", function() {
  gulp.src("sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer({browsers: [
        "last 2 versions"
      ]}),
      mqpacker({
        sort: true
      })
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream())
    .pipe(cssminify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"));
});

gulp.task("js:copy", function () {
  return gulp.src("js/**/*.js")
    .pipe(gulp.dest("build/js"));
});

gulp.task("js", ["js:copy"], function () {
  return gulp.src("build/js/**/*.js")
    .pipe(plumber())
    .pipe(jsuglify())
    .pipe(rename("main.min.js"))
    .pipe(gulp.dest("build/js"));
});

gulp.task("images", function () {
  return gulp.src("build/img/**/*.{png,jpg,gif}")
    .pipe(plumber())
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true})
    ]))
    .pipe(gulp.dest("build/img"));
});

gulp.task("svg", function () {
  return gulp.src("build/img/**/*.svg")
    .pipe(plumber())
    .pipe(svgmin())
    .pipe(gulp.dest("build/img"));
});

gulp.task("serve", function() {
  server.init({
    browser: "google chrome",
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("sass/**/*.{scss}", ["style"]);
  gulp.watch("js/**/*.js", ["js"]);
  gulp.watch("*.html", ["html:update"]);
});

gulp.task("build", function (fn) {
  run("clean", "copy", "style", "js", "images", "svg", fn);
});
