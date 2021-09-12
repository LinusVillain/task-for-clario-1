const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();
const mincss = require("gulp-csso");
const rename = require("gulp-rename");
const del = require("del");
const minjs = require("gulp-terser");
const minHtml = require("gulp-htmlmin");

// Styles

const styles = () => {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(mincss())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
};

exports.styles = styles;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: "build"
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
};

exports.server = server;

//  Html

const html = () => {
  return gulp.src("source/*.html")
    .pipe(gulp.dest("build"))
    .pipe(minHtml({ collapseWhitespace: true }))
    .pipe(rename(function (path) {
      path.basename += ".min";
    }))
    .pipe(gulp.dest("build"))
    .pipe(sync.stream());
};

exports.html = html;

//  Clean

const clean = () => {
  return del("build");
};

exports.clean = clean;

// Watcher

const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series(styles));
  gulp.watch("source/js/**/*.js", gulp.series(scripts));
  gulp.watch("source/*.html", gulp.series(html));
};

//Scripts

const scripts = () => {
  return gulp.src("source/js/**/*.js")
    .pipe(gulp.dest("build/js"))
    .pipe(minjs())
    .pipe(rename("index.min.js"))
    .pipe(gulp.dest("build/js"));
};

exports.default = gulp.series(
  styles, server, watcher
);

const build = gulp.series(
  clean,
  styles,
  scripts,
  html
);

exports.build = build;

const start = gulp.series(
  build,
  server,
  watcher
);

exports.start = start;