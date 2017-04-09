var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    less = require('gulp-less'),
    connect = require('gulp-connect'),
    imagemin = require('gulp-imagemin');

var bowerSrc = 'bower_components/';

gulp.task('html', function() {
  gulp.src('*.html')
      .pipe(gulp.dest('dist'))
      .pipe(connect.reload());
})

gulp.task('copy', function() {
  gulp.src(bowerSrc + 'jquery/dist/jquery.min.js')
      .pipe(gulp.dest('dist/script'));
  gulp.src(bowerSrc + 'bootstrap/dist/css/bootstrap.min.css')
      .pipe(gulp.dest('dist/css'));
  gulp.src(bowerSrc + 'bootstrap/dist/js/bootstrap.min.js')
      .pipe(gulp.dest('dist/script'));
  gulp.src(bowerSrc + 'flexslider/jquery.flexslider-min.js')
      .pipe(gulp.dest('dist/script'));
  gulp.src(bowerSrc + 'jquery-color/jquery.color.js')
      .pipe(gulp.dest('dist/script'));
})

gulp.task('js', function() {
  gulp.src('script/script.js')
      .pipe(uglify())
      .pipe(gulp.dest('dist/script'))
      .pipe(connect.reload());
})

gulp.task('less', function() {
  gulp.src('less/index.less')
      .pipe(less())
      .pipe(gulp.dest('dist/css'))
      .pipe(connect.reload());
})

gulp.task('image', function() {
  gulp.src('img/*.{png,jpg,gif,ico}')
      .pipe(imagemin())
      .pipe(gulp.dest('dist/img'));
})

gulp.task('watch', function(){
  gulp.watch('*.html', ['html']);
  gulp.watch('script/*.js', ['js']);
  gulp.watch('less/*.less', ['less']);
  gulp.watch('img/*.{png,jpg,gif,ico}');
})

gulp.task('connect', function(){
  connect.server({
    livereload:true,
    root: 'dist'
  })
})
gulp.task('default', ['html', 'js', 'image', 'watch', 'connect', 'copy']);
