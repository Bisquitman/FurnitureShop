import svgSprite from "gulp-svg-sprite";

export const svgsprite = () => {
  return app.gulp.src(app.path.src.svgicons)
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: "SVGSPRITE",
        message: "Error: <%= error.message %>"
      })))
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: `../icons/icons_sprite.svg`,
          // Создавать ли страницу с перечнем иконок
          example: app.isDev,
        },
      },
    }))
    .pipe(app.gulp.dest(`${app.path.build.images}`))
};