var gulp = require('gulp');
var less = require('gulp-less');
var livereload = require('gulp-livereload');
var combo = require('gulp-seajs-combo');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');  
var mincss = require('gulp-minify-css');
var rename = require('gulp-rename');

/*gulp.task('less',function(){
	gulp.src('myproject/static/less/app.less')
	.pipe(less())
	.pipe(gulp.dest('myproject/static/css'))
	.pipe(livereload());
});

gulp.task('watch', function() {
  livereload.listen(); 
  gulp.watch('myproject/static/less/*.less',['less']);
});

gulp.task('default',['less','watch']);*/

gulp.task("jshint",function(){  
   gulp.src("sea-modules/**/*.js")  
      .pipe(jshint())  
      .pipe(jshint.reporter("default"))  
});

gulp.task( 'comboa', function(){
	 return gulp.src( 'sea-modules/main.js' )
		 .pipe( combo())
		 .pipe( uglify())
		 .pipe( rename('init.js'))
		 .pipe( gulp.dest('sea-modules') );		 
});

gulp.task('less',function(){
	gulp.src('static/less/app.less')
	.pipe(less())
	.pipe(gulp.dest('static/css'))
});

gulp.task('minifycss',function(){
	gulp.src('static/css/app.less')
	.pipe(mincss())
	.pipe(gulp.dest('static/css'));
})

gulp.task('default',['jshint','comboa','less','minifycss']);



  

