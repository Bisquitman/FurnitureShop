import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';

// import cleanCss from 'gulp-clean-css';  // Сжатие CSS файлов
import csso from 'gulp-csso';
import webpcss from 'gulp-webpcss'; // Вывод WEBP изображений
import autoprefixer from 'gulp-autoprefixer'; // Добавление вендорных префиксов
import groupCssMediaQueries from 'gulp-group-css-media-queries';  // Группировка медиа-запросов

const sass = gulpSass(dartSass);

export const scss = () => {
  return app.gulp.src(app.path.src.scss, {sourcemaps: app.isDev})
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: "SCSS",
        message: "Error: <%= error.message %>"
      })))
    .pipe(app.plugins.replace(/@img\//g, '../img/'))
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(groupCssMediaQueries())
    .pipe(app.plugins.if(app.isBuild, webpcss(
      {
        webpClass: ".webp",
        noWebpClass: ".no-webp",
      }
    )))
    .pipe(autoprefixer({
      grid: true,
      // overrideBrowserslist: ["last 4 versions"],
      overrideBrowserslist: [
        "last 4 versions",
        "> 1%",
        "ie >= 8",
        "edge >= 15",
        "ie_mob >= 10",
        "ff >= 45",
        "chrome >= 45",
        "safari >= 7",
        "opera >= 23",
        "ios >= 7",
        "android >= 4",
        "bb >= 10"
      ],
      cascade: true,
    }))
    //  Раскомментировать следующую строчку, если нужен не сжатый дубль файла стилей
    .pipe(app.plugins.if(app.isDev, app.gulp.dest(app.path.build.css)))
    // .pipe(cleanCss())
    .pipe(app.plugins.if(app.isBuild, csso()))
    .pipe(rename({extname: ".min.css"}))
    .pipe(app.gulp.dest(app.path.build.css))
    .pipe(app.plugins.browsersync.stream());
};