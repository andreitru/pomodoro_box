module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  parser: "babel-eslint",
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "prettier",
  ],
  parserOptions: {
    ecmaVersion: "2021",
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    },
    sourceType: "module",
  },
  plugins: ["babel", "react", "import", "prettier"],
  rules: {
    "import/no-duplicates": "error",
    "import/no-unresolved": "error",
    "import/named": "error",
    "prettier/prettier": "error",
    "react/no-typos": "error",
    "react/no-unused-state": "error",
    "react/jsx-no-bind": "error",
    "array-callback-return": "error",
    "babel/no-invalid-this": "error",
    "no-unused-vars": ["error", {argsIgnorePattern: "^_"}],
  },
  settings: {
    react: {
      pragma: "React",
      version: "detect",
      flowVersion: "0.63.1",
    },
  },
};