import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  verbose: true,
  testPathIgnorePatterns: ["**/dist"],
  testEnvironment: "node",
  testEnvironmentOptions: { NODE_ENV: "test" },
  coverageDirectory: "<rootDir>/coverage",
  projects: [
    {
      displayName: "getRPF2",
      roots: ["<rootDir>"],
      transform: {
        "^.+\\.ts?$": ["ts-jest", { tsconfig: "<rootDir>/tsconfig.json" }],
      },
    },
  ],
};

export default config;
