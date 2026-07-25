export default {
  transform: {
    "^.+\\.m?[tj]sx?$": "@swc/jest",
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(@prisma)/)",
  ],
};