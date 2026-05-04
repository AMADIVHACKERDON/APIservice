import js from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";

export default [
  // 1. Ignore build artifacts
  {
    ignores: ["dist/", "node_modules/"]
  },
  // 2. Load recommended rules
  js.configs.recommended,
  ...tseslint.configs.recommended,
  // 3. Custom Node.js settings
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "no-unused-vars": "warn"
    },
  }
];
