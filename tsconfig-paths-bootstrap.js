const tsConfigPaths = require('tsconfig-paths');

const baseUrl = './dist'; // Either absolute or relative path. If relative it's resolved to current working directory.
tsConfigPaths.register({
  baseUrl,
  paths: {
    '@app-commons/*': ['src/commons/*'],
    '@app-commons-api/*': ['src/commons/api/*'],
    '@app-commons-domain/*': ['src/commons/domain/*'],
    '@app-commons-infra/*': ['src/commons/infra/*'],
    '@app-modules/*': ['src/modules/*'],
    '@app-test/*': ['test/*'],
  },
});
