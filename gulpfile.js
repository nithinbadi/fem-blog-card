const {src,dest,watch,series} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const browsersync = require('browser-sync').create();

//scss task
function scssTask(){
    return src('app/scss/dist/style.scss',{sourcemaps:true})
    .pipe(sass())
    .pipe(postcss([autoprefixer(),cssnano()]))
    .pipe(dest('dist',{sourcemaps:'.'})
    );
}

//browser sync serve
function browserSyncServe(cb){
    browsersync.init({
        server:{
            baseDir:'.'
        },
        notify:{
            style:{
                top:'auto',
                bottom:'0',
            }
        }
});
cb();
}

//browser sync reload
function browserSyncReload(cb){
    browsersync.reload();
    cb();
}

//watch task
function watchTask(){
    watch('*.html',browserSyncReload);
    watch('app/scss/**/*.scss',series(scssTask,browserSyncReload));
}

//default task when gulp runs on terminal command
exports.default = series(scssTask,browserSyncServe,watchTask);