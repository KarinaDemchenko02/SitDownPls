const { src, dest, series, watch} = require('gulp');
const gulp = require('gulp');
const concat = require('gulp-concat');
const htmlmin = require('gulp-htmlmin');
const autoprefixes = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const svgSprite = require('gulp-svg-sprite');
const image = require('gulp-image');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify-es').default;
const ttf2woff = require('gulp-ttf2woff');
const ttf2woff2 = require('gulp-ttf2woff2');
const fileinclude = require('gulp-file-include');
const sourcemaps = require('gulp-sourcemaps');
const notify = require('gulp-notify');
const del = require('del');
const connect = require('gulp-connect-php');
const browserSync = require('browser-sync').create();

const clean = () => {
    return del(['dist'])
}

const resources = () => {
    return src('src/resources/**')
        .pipe(dest('dist'))
}


const htmlInclude = () => {
  return src('src/*.html')
    .pipe(fileinclude({
      prefix: '@',
      basepath: '@file'
    }))
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
}

const fonts = () => {
    src('src/fonts/**.ttf')
        .pipe(ttf2woff())
        .pipe(dest('dist/fonts'))
    return src('src/fonts/**.ttf')
        .pipe(ttf2woff2())
        .pipe(dest('dist/fonts'))
}

const styles = () => {
    return src('src/styles/**/*.css')
        .pipe(sourcemaps.init())
        .pipe(concat('styles.css'))
        .pipe(autoprefixes({
            cascade: false
        }))
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(sourcemaps.write())
        .pipe(dest('dist'))
        .pipe(browserSync.stream())
}

const svgSprites = () => {
    return src('src/images/svg/**/*.svg')
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: '../sprite.svg'
                }
            }
        }))
        .pipe(dest('dist/images'))
}

const phpInclude = () => {
  return src('src/php/**/*.php')
    .pipe(fileinclude({
      prefix: '@',
      basepath: '@file'
    }))
    .pipe(dest('dist/php'))
    .pipe(browserSync.stream())
}

const phpMainFile = () => {
  return src('src/**/*.php')
    .pipe(fileinclude({
      prefix: '@',
      basepath: '@file'
    }))
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}

const scripts = () => {
    return src([
        'src/js/components/**/*.js',
        'src/js/*.js'
    ])
    .on('error', function (err) {
        console.error('WEBPACK ERROR', err);
        this.emit('end'); // Don't stop the rest of the task
    })
    .pipe(sourcemaps.init())
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(dest('dist/js'))
    //.pipe(concat('app.js'))
    .pipe(sourcemaps.write())
    //.pipe(dest('dist'))
    .pipe(browserSync.stream())
}

const images = () => {
  return src([
          'src/images/**/*.jpg',
          'src/images/**/*.png',
          'src/images/*.svg',
          'src/images/**/*.jpeg'
      ])
      .pipe(dest('dist/images'))
}

const watchFiles = () => {
    browserSync.init({
        server: {
            baseDir: 'dist',
        },
    })
}

watch('src/styles/**/*.css', styles)
watch('src/*.html', htmlInclude);
watch('src/images/*.{jpg,jpeg,png,svg}', images);
watch('src/images/**/*.{jpg,jpeg,png}', images);
watch('src/images/svg/**/*.svg', svgSprites)
watch('src/js/**/*.js', scripts)
watch('src/resources/**', resources)
watch('src/fonts/**.ttf', fonts)
watch('src/*.php', phpMainFile);
watch('src/php/**/*.php', phpInclude);

exports.clean = clean
exports.styles = styles
exports.scripts = scripts
exports.images = images
exports.default = series(clean, resources, scripts, fonts, styles, images, htmlInclude, phpInclude, phpMainFile, svgSprites, watchFiles)


const cleanBuild = () => {
    return del(['build'])
}

const resourcesBuild = () => {
    return src('dist/resources/**')
        .pipe(dest('build'))
}

const stylesBuild = () => {
    return src('dist/styles/**/*.css')
        .pipe(concat('styles.css'))
        .pipe(autoprefixes({
            cascade: false
        }))
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(dest('build'))
}

const scriptsBuild = () => {
    return src([
        'dist/js/components/**/*.js',
        //'dist/js/main.js'
        'dist/js/*.js'
    ])
    .on('error', function (err) {
        console.error('WEBPACK ERROR', err);
        this.emit('end'); // Don't stop the rest of the task
    })
    .pipe(babel({
        presets: ['@babel/env']
    }))
    //.pipe(concat('app.js'))
    .pipe(uglify({
        toplevel: true
    }).on('error', notify.onError()))
    .pipe(dest('build'))
}

const svgSpritesBuild = () => {
    return src('dist/images/svg/**/*.svg')
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: '../sprite.svg'
                }
            }
        }))
        .pipe(dest('build/images'))
}

const htmlMinifyBuild = () => {
    return src('dist/**/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(dest('build'))
}

exports.build = series(cleanBuild, resourcesBuild, htmlMinifyBuild, scriptsBuild, stylesBuild, svgSpritesBuild)
