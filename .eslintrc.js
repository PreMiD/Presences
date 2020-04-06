module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    project: "./tsconfig.json"
  },
  rules: {
    semi: ["warn", "always", { omitLastInOneLineBlock: true }],
    quotes: "off",
    indent: "off",
    camelcase: "off",
    "comma-dangle": ["warn", "never"],
    "linebreak-style": "off",
    "no-console": "off",
    "no-var": "off",
    "no-undef": "off",
    "@typescript-eslint/camelcase": "off",
    "@typescript-eslint/no-explicit-any": "off"
  },
  plugins: ["@typescript-eslint"]
};
