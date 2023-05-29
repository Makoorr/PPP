/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [__dirname + '/src/__tests__/*.test.ts'],
  verbose: true,
  forceExit: true,
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/controller/*.ts','src/*.ts'],
  // ignore directory in coverage
  coveragePathIgnorePatterns: [
    'src/index.ts',
  ],
  coverageReporters: ['lcov', 'text']
};