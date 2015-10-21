var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  watch = require('gulp-watch'),
  nodemon = require('gulp-nodemon'),
  sourcemaps = require('gulp-sourcemaps'),
  ngAnnotate = require('gulp-ng-annotate'),
  browserSync = require('browser-sync');

var config = require('./config/config.json');

gulp.task('default', function () {
  nodemon({
    script: 'app.js',
    ext: 'js ejs',
    ignore: ['public','node_modules'],
    env: { 'NODE_ENV': 'dev' }
  });
  var files = [
    'public/css/*.css',
    'public/scripts/**/*',
    'public/styles/*.css',
    'views/*.ejs'
  ];
  watch('public/scripts/**/*.js', function () {
  console.log('hubo un cambio');
  gulp.src(
      [
      'public/scripts/app.js',
      'public/scripts/**/*.js',
      ],{base: 'public/scripts/'})
    // .pipe(ngAnnotate())
    .pipe(sourcemaps.init())
    .pipe(concat('build.js'))
    .pipe(uglify())
    .on('error',function (err) {
      console.log('Opsie');
    })
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/js/'));
  });


    browserSync.init(files, {
      proxy: 'localhost:' + config.port + '/',
      port:3001
    });
});


gulp.task('watch', function () {
  console.log('Iniciando tarea "Watch"');

  watch('public/scripts/**/*.js', function () {
  console.log('hubo un cambio');
  gulp.src(
      [
      'public/scripts/app.js',
      'public/scripts/**/*.js',
      ],{base: 'public/scripts/'})
    .pipe(sourcemaps.init())
    .pipe(concat('build.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/js/'));
  });

});

gulp.task('go', function () {
  console.log('Procesando archivos :)');

  gulp.src(
      [
      'public/scripts/app.js',
      'public/scripts/**/*.js',
      ],{base: 'public/scripts/'})
    .pipe(sourcemaps.init())
    .pipe(concat('build.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/js/'));

});

gulp.task('vendor',function () {

  gulp.src(
      [
      // 'public/scripts/scheduler/*.js',
      'public/bower_components/json3/lib/json3.min.js',
      'public/bower_components/bootstrap/dist/js/bootstrap.min.js',
      'public/bower_components/angular-cookies/angular-cookies.js',
      'public/bower_components/angular-sanitize/angular-sanitize.min.js',
      'public/bower_components/angular-route/angular-route.min.js',
      'public/bower_components/angular-loading-bar/build/loading-bar.min.js',
      'public/bower_components/sweetalert/lib/sweet-alert.min.js',
      'public/js/moment.min.js',
      'public/js/jquery.dataTables.min.js',
      'public/js/angular-datatables.min.js'
      ],{base: 'public/scripts/'})
    .pipe(concat('vendor.js'))
    // .pipe(uglify())
    .pipe(gulp.dest('public/js/'));

});
