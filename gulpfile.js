"use strict";
const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const minify = require("gulp-minify");
const sourceMaps = require("gulp-sourcemaps");
const concat = require("gulp-concat");

const dist = "dist"

gulp.task("html", () => {
	return gulp
	.src("src/index.html")
	.pipe(gulp.dest(dist));
});
gulp.task("assets", () => {
	return gulp
	.src("src/assets/**")
	.pipe(gulp.dest(dist+'/assets'));
});

gulp.task("sass", (cb) => {
	gulp
		.src("src/styles/*.scss")
		.pipe(sass().on("error", sass.logError))
		.pipe(concat("style.css"))
		.pipe(gulp.dest(dist));
	cb();
});

gulp.task("js", (cb) => {
	gulp
		.src(["src/js/**/*.js"])
		.pipe(minify({ noSource: true }))
		.pipe(concat("bundle.js"))
		.pipe(gulp.dest(dist));
	cb();
});

gulp.task("build", gulp.series("sass", "html", "js","assets"));

gulp.task("dev", () => {
	gulp.watch("src/styles/*.scss", gulp.series("sass"));
	gulp.watch("src/assets/*", gulp.series("assets"));
	gulp.watch("src/*.html", gulp.series("html"));
	gulp.watch("src/js/*.js", gulp.series("js"));
});
