/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  // testPathIgnorePatterns: [
  //   '/node_modules/',
  //   '/.next/',
  //   '/out/'
  // ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/app/$1'
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  // transform: {
  //   '^.+\\.tsx?$': 'ts-jest'
  // }
};
