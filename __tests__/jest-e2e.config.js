module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testRegex: '.e2e.ts$',
    modulePathIgnorePatterns: ["<rootDir>/dist/"],

};