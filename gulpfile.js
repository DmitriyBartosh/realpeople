// инициализация подключенных плагинов
const { src, dest, watch, parallel, series } = require('gulp');

const scss = require('gulp-sass');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const del = require('del');
const pug = require('gulp-pug');
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

// Удаление папки с изображениями
function cleanImg() {
  return del(['app/img/**', '!app/img/logo', 'app/webp/**'])
}

// Минификация изображений
function images() {
    return src('app/imageoriginal/**/*')
    .pipe(imagemin(
        [
            imagemin.gifsicle({interlaced: true}),
            imagemin.mozjpeg({quality: 85, progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]
    ))
    .pipe(dest('app/img'))
}

// Webp
function webpImg() {
  return src('app/imageoriginal/**/*')
  .pipe(webp({
    quality: 85,
    preset: 'photo',
    method: 6
  }))
  .pipe(dest('app/webp'))
}

// Сборка html страниц
function htmlPages() {
    return src('app/pug/pages/**/*.pug')
    .pipe(pug({
        pretty: true
    }))
    .pipe(dest('app'))
    .pipe(browserSync.stream())
}

// Оптимизация скриптов
const jsFiles = ['app/js/script.js', 'app/js/webp.js'];
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
        'app/scss/navigation.scss',
        'app/scss/style.scss',
        'app/scss/styleService.scss',
        'app/scss/styleCategory.scss',
        'app/scss/styleFreelance.scss',
        'app/scss/headerPromo.scss'
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
        'app/*.html',
        'app/img/**/*'
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
exports.cleanImg = cleanImg;
exports.htmlPages = htmlPages;
exports.webpImg = webpImg;

// Сборка проекта (команда build)
exports.build = series(cleanDist, build);
// Сборка изображений
exports.image = series(cleanImg, images, webpImg);
// Запуск обновление стилей, скриптов, синхронизация браузара и слежение за изменениями(команда gulp)
exports.default = parallel(htmlPages, styles, scripts, browsersync, watching); 