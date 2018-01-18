const gulp = require('gulp');
const yaml = require('js-yaml');
const path = require('path');
const fs = require('fs');

const swaggerYAML = path.join(__dirname, './api/swagger/swagger.yaml');
const swaggerJSON = path.join(__dirname, './swagger.json');

gulp.task('swagger', () => {
  const doc = yaml.safeLoad(fs.readFileSync(swaggerYAML));
  fs.writeFileSync(swaggerJSON, JSON.stringify(doc, null, ' '));
});

gulp.task('watch', () => gulp.watch('api/swagger/swagger.yaml', ['swagger']));
