module.exports = {
    // The root of your source code, typically /src
    // `<rootDir>` is a token Jest substitutes
    roots: ["<rootDir>/src"],

    preset: 'ts-jest',
    coveragePathIgnorePatterns: [
        "/node_modules/",
        "enzyme.js"
    ],
    // Jest transformations -- this adds support for TypeScript
    // using ts-jest
    transform: {
        "^.+\\.tsx?$": "ts-jest",
        "^.+\\.css$": "<rootDir>/__mocks__/cssTransformer.js",
        "^.+\\.png|svg|mp3$": "<rootDir>/__mocks__/fileTransformer.js",
    },
    setupFiles: ['<rootDir>/src/setupTests.ts'],

    // Runs special logic, such as cleaning up components
    // when using React Testing Library and adds special
    // extended assertions to Jest
    //setupFilesAfterEnv: ["@testing-library/react/cleanup-after-each", "@testing-library/jest-dom/extend-expect"],

    // Test spec file resolution pattern
    // Matches parent folder `__tests__` and filename
    // should contain `test` or `spec`.
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    "collectCoverage": true,
    "coverageReporters": ["lcov"],
    "coverageDirectory": "test-coverage",
    "coverageThreshold": {
        "global": {
            "branches": 0,
            "functions": 0,
            "lines": 0,
            "statements": 0
        },


        // Module file extensions for importing
        moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node", "css"],
    }
};