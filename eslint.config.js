// eslint.config.js
import globals from "globals";
import js from "@eslint/js";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    // This config block sets up ESLint for Node.js code
    languageOptions: {
      // Instead of browser globals, use node globals
      globals: {
        ...globals.node,
      },
      parserOptions: {
        // let ESLint parse modern JS features
        ecmaVersion: "latest",
        // "module" if using ESM (import/export), or "script" for CommonJS
        sourceType: "module",
      },
    },
    rules: {
      // You can put custom Node-related rules here, or turn off what you don't need
      // e.g. "no-console": "off"
    },
  },
  // Then merge with @eslint/js recommended config
  js.configs.recommended,
];
