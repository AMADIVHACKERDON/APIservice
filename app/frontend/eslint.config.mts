import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import globals from "globals";
import { fixupPluginRules } from "@eslint/compat"; // <--- Add this

export default [
  {
    ignores: ["dist/", "node_modules/"]
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      // Wrap the plugin here
      react: fixupPluginRules(reactPlugin), 
    },
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        // Explicitly setting version helps bypass the failing auto-detect logic
        version: "detect", 
      },
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
    },
  },
];
