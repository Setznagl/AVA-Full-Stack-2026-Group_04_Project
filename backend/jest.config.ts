import type {Config} from 'jest';

const config: Config = {

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
