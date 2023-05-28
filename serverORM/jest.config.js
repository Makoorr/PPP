/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [__dirname + '/src/__tests__/*.test.ts'],
  verbose: true,
  forceExit: true,
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts'],
  coverageReporters: ['lcov', 'text']
};