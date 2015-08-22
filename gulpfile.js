var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var path = require('path');

function server () {
    var app = require('./app');
    var server = app.listen(8080, '0.0.0.0');
    console.log('Server running at http://127.0.0.1:8080/');
}

gulp.task('server', server);

gulp.task('mocha', function () {
   return gulp.src('./test/*.js')
       .pipe(plugins.mocha());
           //.once('end', function () {
           //    process.exit();
           //});
});
gulp.task('jade', function () {
    return gulp.src('./views/jade/viewModels/*.jade')
        .pipe(plugins.jade())
        .pipe(gulp.dest('./public/web/'));
});
gulp.task('jade:index', function () {
    return gulp.src('./views/jade/index.jade')
        .pipe(plugins.jade())
        .pipe(gulp.dest('./public/'));
});

var lessPath = [path.join(__dirname, 'src', 'less', 'includes'),
                path.join(__dirname, 'src', 'less', 'components')];
gulp.task('less', function () {
    return gulp.src('./views/less/app.less')
        .pipe(plugins.less({ paths: lessPath }))
        .pipe(plugins.debug())
        .pipe(plugins.minifyCss({ compatibility: 'ie9' }))
        .pipe(gulp.dest('./public/css/'));
});

gulp.task('scripts', function() {
    return gulp.src(['./src/**/*.js'])
        // .pipe(plugins.jshint('.jshintrc'))
        // .pipe(plugins.jshint.reporter('default'))
        // .pipe(plugins.uglify())
        .pipe(gulp.dest('public/js/'))
        .pipe(browserSync.stream());
});

// copy files from ref
gulp.task('copy:img', function () {
    return gulp.src('./views/ref/i/**/*.png')
        .pipe(gulp.dest('./public/i'));
});
gulp.task('copy:js', function () {
    return gulp.src('./views/ref/js/**/*.js')
        .pipe(gulp.dest('./public/js'));
});
gulp.task('copy:css', function () {
    return gulp.src('./views/ref/css/**/*.css')
        .pipe(gulp.dest('./public/css'));
});
gulp.task('copy', ['copy:img', 'copy:css', 'copy:js']);

gulp.task('test', ['mocha']);

gulp.task('build', ['less', 'jade', 'jade:index', 'copy', 'server']);
gulp.task('default', ['build']);