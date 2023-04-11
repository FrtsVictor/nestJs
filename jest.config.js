module.exports = {
  clearMocks: true,
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/node_modules/', '/.node/', '/jest/', '/dist/'],
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@app-root(.*)$': '<rootDir>/src/app/$1',
    '^@app-modules(.*)$': '<rootDir>/src/modules/$1',
    '^@app-commons-infra(.*)$': '<rootDir>/src/commons/infra/$1',
    '^@app-commons-api(.*)$': '<rootDir>/src/commons/api/$1',
    '^@app-commons-domain(.*)$': '<rootDir>/src/commons/domain/$1',
  },
};
