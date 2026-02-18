import js from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import next from "eslint-config-next";
import prettier from "eslint-plugin-prettier";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import tseslint from "typescript-eslint";

export default defineConfig([
  globalIgnores([".next", "dist", "node_modules"]),
  js.configs.recommended,
  ...tseslint.configs.recommended,
  next,
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    plugins: {
      prettier,
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "prettier/prettier": [
        "error",
        {
          endOfLine: "auto",
        },
      ],
      "simple-import-sort/imports": [
        "error",
        {
          groups: [["^node:", "^@?\\w", "^\\.", "^\\u0000", "^"]],
        },
      ],
      "simple-import-sort/exports": "error",
      "import/first": "error",
      "import/newline-after-import": "error",
      "import/no-duplicates": "error",
      "import/extensions": [
        "error",
        "ignorePackages",
        {
          ts: "never",
          tsx: "never",
          js: "never",
          jsx: "never",
        },
      ],
      "@typescript-eslint/no-explicit-any": "off",
      "react-hooks/set-state-in-effect": "off",
    },
    settings: {
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json",
        },
      },
    },
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: "module",
    },
  },
]);
