// инициализация подключенных плагинов
const { src, dest, watch, parallel, series } = require('gulp');

const scss = require('gulp-sass');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const del = require('del');
const pug = require('gulp-pug');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const { notify } = require('browser-sync');

// Синхронизация с браузером
function browsersync (){
    browserSync.init({
        server: {
            baseDir: "app/"
        },
        browser: 'chrome',
    });
}

// Удаление папки с готовым проектом (для перезаписи)
function cleanDist() {
    return del('dist')
}

// Минификация изображений
function images() {
    return src('app/img/**/*')
    .pipe(imagemin(
        [
            imagemin.gifsicle({interlaced: true}),
            imagemin.mozjpeg({quality: 75, progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]
    ))
    .pipe(dest('dist/img'))
}

// Сборка html страниц
function htmlPages() {
    return src('app/pug/pages/*.pug')
    .pipe(pug({
        pretty: true
    }))
    .pipe(dest('app'))
    .pipe(browserSync.stream())
}

// Оптимизация скриптов
const jsFiles = ['app/js/script.js'];
function scripts(){
    return src(jsFiles)
    .pipe(webpackStream({
      output: {
        filename: 'script.js'
      },
      module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-env', { targets: "defaults" }]
                ]
              }
            }
          }
        ]
      }
    }))
    .pipe(sourcemaps.init())
    .pipe(concat('bundle.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(dest('app/js'))
    .pipe(browserSync.stream())
}

// Оптимизация скриптов
function styles(){
    return src([
        'app/scss/font.scss',
        'app/scss/normalize.scss',
        'app/scss/nav.scss',
        'app/scss/navMain.scss',
        'app/scss/style.scss'
    ])
    .pipe(scss({outputStyle: 'compressed'}))
    .pipe(concat('style.min.css'))
    .pipe(autoprefixer({
        overrideBrowserslist: ['last 10 version'],
        grid: true
    }))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream())
}

// Сборка проекта
function build() {
    return src([
        'app/css/style.min.css',
        'app/fonts/**/*',
        'app/js/main.min.js',
        'app/*.html'
    ], {base: 'app'})
    .pipe(dest('dist'))
}

// Слежение за изменением файлов проекта
function watching() {
    watch(['app/pug/**/*.pug'], htmlPages);
    watch(['app/scss/**/*.scss'], styles);
    watch(['app/js/**/*.js', '!app/js/bundle.js'], scripts);
    watch(['app/*.html'], browsersync.reload);
}

exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.images = images;
exports.cleanDist = cleanDist;
exports.htmlPages = htmlPages;

// Сборка проекта (команда build)
exports.build = series(cleanDist, images, build);
// Запуск обновление стилей, скриптов, синхронизация браузара и слежение за изменениями(команда gulp)
exports.default = parallel(htmlPages, styles, scripts, browsersync, watching); 