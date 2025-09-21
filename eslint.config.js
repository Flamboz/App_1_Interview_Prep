import { defineConfig } from "eslint/config";

export default defineConfig({
  files: ["src/**/*.js"],
  rules: {
    "no-console": "warn",
  },
});