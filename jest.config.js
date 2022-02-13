// module.exports = {
// //   preset: '@nuxt/test-utils',
//   collectCoverage: true,
//   coverageThreshold: {
//     global: { statements: 90 },
//   },
//   moduleNameMapper: {
//     '^@/(.*)$': '<rootDir>/$1',
//     '^~/(.*)$': '<rootDir>/$1',
//     '^vue$': 'vue/dist/vue.common.js',
//   },
//   moduleFileExtensions: ['ts', 'js', 'vue', 'json'],
//   transform: {
//     '^.+\\.ts$': 'ts-jest',
//     '^.+\\.js$': 'babel-jest',
//     '.*\\.(vue)$': 'vue-jest',
//   },
//   collectCoverageFrom: [
//     '<rootDir>/components/**/*.vue',
//     '<rootDir>/pages/**/*.vue',
//   ],
//   testEnvironment: 'jsdom',
//   "testURL": "http://localhost/"
// }

module.exports = {
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1',
    '^vue$': 'vue/dist/vue.common.js',
  },
  moduleFileExtensions: ['ts', 'js', 'vue', 'json'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/components/**/*.vue',
    '<rootDir>/pages/**/*.vue',
  ],
  // testEnvironment: 'jsdom',
}
