/** @type {import('jest').Config} */
const config = {
  roots: ['<rootDir>'],
    collectCoverageFrom: [
      'src/**/*.{js,jsx,ts,tsx}',
      '!src/**/*.d.ts',
      '!src/mocks/**'
    ],
    coveragePathIgnorePatterns: [],
    setupFiles: ['dotenv/config'],
    modulePaths: ['<rootDir>'],
    transform: {
      '^.+\\.(ts|js|tsx|jsx)$': '@swc/jest',
      '^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)':
        '<rootDir>/config/jest/fileTransformer.js'
    },
    transformIgnorePatterns: [
      '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$',
      '^.+\\.module\\.(css|sass|scss)$'
    ],
    coverageThreshold: {
      global: {
        branches: 31,
        functions: 32,
        lines: 41,
        statements: 41
      }
    },
    modulePaths: ['<rootDir>'],
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
    watchPlugins: [
      'jest-watch-typeahead/filename',
      'jest-watch-typeahead/testname'
    ],
    resetMocks: true,
    testTimeout: 5000
};

module.exports = config;  