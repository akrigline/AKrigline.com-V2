var gulp = require('gulp'),
		compass = require('gulp-compass'),
		notify = require('gulp-notify') ,
		bower = require('gulp-bower'),
		bowerFilesMain = require('main-bower-files'),
		jshint = require('gulp-jshint'),
		jshintStylish = require('jshint-stylish'),
		uglify = require('gulp-uglify'),
		concat = require('gulp-concat'),
		uncss = require('gulp-uncss');

var config = { 
	sassDir: './sass',
	cssDir: './style.css',
	htmlDir: './*.html',
	imgDir: './img/**',
	fontsDir: './fonts/**.*',
	 bowerDir: './bower_components' ,
	jsDir: './js' ,
	buildDir: './build'
}

// Run Bower to Gather all files in bower.json
gulp.task('bower', function() { 
	return bower() .pipe(gulp.dest(config.bowerDir)) 
});

//Concats all Bower js files and puts them in vendor
gulp.task("bowerfiles", ['bower'], function(){
  return gulp.src(bowerFilesMain({
  	filter: '**/*.js',
  	includeDev: 'exclusive'
  }), {base: config.bowerDir })
  	.pipe(concat('bowerfiles.js'))
    .pipe(gulp.dest(config.jsDir + '/vendor'))
});

// Run Compass on SCSS Files
gulp.task('css', function() {
	gulp.src(config.sassDir)
		.pipe(compass({
				config_file: 'config.rb',
				css: './',
				sass: config.sassDir
			})
		)
		.on('error', function(error) {
      // Spits error out 
      console.log(error);
      this.emit('end');
    })
		.pipe(gulp.dest('./'))
});
gulp.task('uncssstyle', ['css'], function() {
	gulp.src(config.cssDir)
    .pipe(uncss({
    	html: [ config.htmlDir ]
    }))
		.pipe(gulp.dest('./'))
});


//Build one js files in the 'build' directory
gulp.task('js', ['bowerfiles'], function(){
	gulp.src(config.jsDir + '/**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(gulp.dest(config.jsDir))
});

//Build Functions
gulp.task('buildjs', ['js'], function() {
	gulp.src([config.jsDir + '/main.js', config.jsDir + '/vendor/bowerfiles.js'])
		.pipe(uglify())
		.pipe(concat('app.js'))
		.pipe(gulp.dest(config.buildDir + '/js'))
});

gulp.task('buildcss', ['uncssstyle'], function() {
	gulp.src('./*.css')
		.pipe(concat('style.css'))
		.pipe(gulp.dest(config.buildDir))
});

gulp.task('buildhtml', function() {
	gulp.src(config.htmlDir)
		.pipe(gulp.dest(config.buildDir))
});

gulp.task('buildimg', function() {
	gulp.src(config.imgDir)
		.pipe(gulp.dest(config.buildDir + '/images'))
});

gulp.task('buildfonts', function() {
	gulp.src(config.fontsDir)
		.pipe(gulp.dest(config.buildDir + '/fonts'))
});

// Rerun the task when a file changes
 gulp.task('watch', function() {
   gulp.watch(config.sassDir + '/**/*.scss', ['uncssstyle']);
});

  gulp.task('default', ['js', 'uncssstyle']);

//Gather all Final Files into a 'build' directory
gulp.task('build', ['buildjs', 'buildcss', 'buildhtml', 'buildimg', 'buildfonts']);