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
    '^@app-domain(.*)$': '<rootDir>/src/Domain/$1',
    '^@app-api(.*)$': '<rootDir>/src/Api/$1',
    '^@app-infra(.*)$': '<rootDir>/src/Infra/$1',
  },
};
