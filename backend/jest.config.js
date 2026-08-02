/** @type {import('jest').Config} */
const config = {
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  testEnvironment: "node",

  transform: {
    "^.+\\.m?[tj]sx?$": [
      "@swc/jest",
      {}
    ],
  },

  transformIgnorePatterns: ["node_modules/(?!@prisma/client|@prisma/internals)"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1"
  },
  extensionsToTreatAsEsm: [".ts"],
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
  testMatch: [
    "**/__tests__/**/*.ts",
    "**/?(*.)+(spec|test).ts"
  ],
  clearMocks: true,
  roots: [
    "<rootDir>"
  ]
};

export default config;