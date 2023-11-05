import type { Config } from 'jest';

const config: Config = {
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
      moduleFileExtensions: ['ts', 'js', 'json', 'node'],
      watchPlugins: [
        'jest-watch-typeahead/filename',
        'jest-watch-typeahead/testname'
      ],
      resetMocks: true,
      testTimeout: 5000,
      moduleNameMapper: {
        '^@DAO/(.*)$': 'src/DAO/$1',
        '^@Controllers/(.*)$': 'src/controller/$1',
        '^@Constants/(.*)$': 'src/constants/$1',
        '^@Libs/(.*)$': 'src/libs/$1',
        '^@Middlewares/(.*)$': 'src/middlewares/$1',
        '^@Models/(.*)$': 'src/models/$1',
        '^@Routes/(.*)$': 'src/routes/$1',
        '^@Utils/(.*)$': 'src/util/$1',
        '^@Loggers/(.*)$': 'src/logger/$1',
        '^@Interfaces/(.*)$': 'src/interfaces/$1',
        '^@Helpers/(.*)$': 'src/helpers/$1'
      }
  };

  export default config;