var gulp = require("gulp");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var cssnano = require("gulp-cssnano");
var htmlmin = require("gulp-htmlmin");
var smushit = require('gulp-smushit');

gulp.task('images', function() {
    return gulp.src('src/images/*')
        .pipe(smushit({
            verbose: true
        }))
        .pipe(gulp.dest('./dest/images-smushit'));
});

gulp.task("script", function() {
    gulp.src(["./src/js/*.js"])
        //.pipe(concat("index.js"))
        .pipe(uglify())
        .pipe(gulp.dest("./dest/js"))
})
gulp.task("style", function() {
    gulp.src(["./src/css/*.css"])
        //.pipe(concat("index.css"))
        .pipe(cssnano())
        .pipe(gulp.dest("./dest/css"))
})
gulp.task("html", function() {
    gulp.src(["./src/*.html"])
        .pipe(htmlmin({ removeComments: true, collapseWhitespace: true, collapseBooleanAttributes: true, removeEmptyAttributes: true, removeScriptTypeAttributes: true, removeStyleLinkTypeAttributes: true, minifyCSS: true, minifyJS: true }))
        .pipe(gulp.dest("./dest"))
})
gulp.task("mywatch", function() {
    gulp.run("script");
    gulp.watch("./src/js/*.js", "script");
    gulp.watch("./src/css/*.css", "style");
    gulp.watch("./src/images/*", "images");
    gulp.watch("./src/*.html", "images");

})

//制作精灵图，但是没有css可以实验，所以暂时放弃
var spritesmith = require("gulp.spritesmith")

gulp.task('imgmin', function() {
    gulp.src("src/imgmin/*")
        .pipe(spritesmith({
            imgName: 'dest/imgmin/sprite.png', //合并后大图的名称
            cssName: '', //'css/sprite.less',
            padding: 2, // 每个图片之间的间距，默认为0px
            cssTemplate: (data) => {
                // data为对象，保存合成前小图和合成打大图的信息包括小图在大图之中的信息
                var arr = [],
                    width = data.spritesheet.px.width,
                    height = data.spritesheet.px.height,
                    url = data.spritesheet.image
                    // console.log(data)
                data.sprites.forEach(function(sprite) {
                        arr.push(
                            ".icon-" + sprite.name +
                            "{" +
                            "background: url('" + url + "') " +
                            "no-repeat " +
                            sprite.px.offset_x + " " + sprite.px.offset_y + ";" +
                            "background-size: " + width + " " + height + ";" +
                            "width: " + sprite.px.width + ";" +
                            "height: " + sprite.px.height + ";" +
                            "}\n"
                        )
                    })
                    // return "@fs:108rem;\n"+arr.join("")
                return arr.join("")
            }
        }))
        .pipe(gulp.dest("./dest/imgmin"))
})