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
    '^@app-core(.*)$': '<rootDir>/src/core/$1',
  },
};
