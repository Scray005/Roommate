var gulp = require('gulp');
//var css = require('gulp-css');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');
var htmlmin = require('gulp-htmlmin');
var minifyCSS = require('gulp-minify-css');
// variables para crear un servidor

var childProcess = require('child_process');  
var exec = childProcess.exec;  
var spawn = childProcess.spawn;

var server;

//var myScripts = [ 'src/autenticacion.js', 'ConfigFirebase.js', 'general.js', 'jquery-3.2.1.js' ];

gulp.task('default', function() {  
  console.log('gulp!');
});

// watch cada vez que hiciéramos una modificación a uno de nuestros ficheros javascript se ejecutaría de manera transparente para nosotros la tarea scripts
var myScripts = 'src/**/*.js'; 
gulp.task('scripts', function(){ 
    return gulp.src(myScripts) 
        .pipe(uglify('main.min.js')) //comprime a main.min.js
        .pipe(gulp.dest('./dist')); //Destino del nuevo fichero en el directorio ./dist 
});

//comprimir imagenes
gulp.task('images', () => {
	return gulp.src('Roommate/imagenes/**/*.+(png|jpg|gif|svg)')
	.pipe(cache(imagemin({
		interlaced : true
	})))
	.pipe(gulp.dest('dist/imagenes'))
});

//limpiar
gulp.task('clean', () => {
	return del.sync('dist');
});

//comprimir html
gulp.task('useref', () => {
	return gulp.src('app/**/*.html')
	.pipe(useref())
	.pipe(gulpIf('*.js', minify({mangle: false})))
	.pipe(gulpIf('*.css', minifyCSS()))
	.pipe(gulpIf('*.html', htmlmin({collapseWhitespace: true})))	
	.pipe(gulp.dest('dist'))
});

//comprimir el contenido del archivo css

gulp.task('css', function() {  
 return gulp.src('estilos.css')
    .pipe(minify())
    .pipe(rename('estilos.min.css'))
    .pipe(gulp.dest('app/css'));
});

//guarda los cambios cuando modificamos
  gulp.task('watch', function () {  
  gulp.watch('estilos.css', ['css']);
});

//Recargar navegador
  gulp.task('browserSync', () => {
	browserSync.init({
		server:{
			baseDir : 'app'
		}
	})

	});

gulp.task('watch', ['browserSync', 'css'], () => {
	gulp.watch('app/css/*.styl', ['css']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('build', (callback) => {
	runSequence('clean', 'css'
		['useref', 'images'],
		callback)
});


// crea un servidor (Iniciar un servidor local)
function createServer() {  
  return spawn('node', ['./app/index.js'], {stdio: "inherit", cwd: process.cwd() });
}

gulp.task('server', function () {  
  server = createServer();
});

gulp.task('default', ['server'], function () {  
  gulp.watch('app/**/*.js', function () {
    if (server) { server.kill(); }
    server = createServer();
  });
});

//pipe() usando este método decimos a Gulp qué queremos hacer sobre los archivos
//src() indicamos donde se encuentra Gulp
//dest() indicamos donde queremos guardar el archivo