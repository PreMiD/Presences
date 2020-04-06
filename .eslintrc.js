module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true
  },
  extends: "eslint:recommended",
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaVersion: 2020
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
    "no-undef": "off"
  },
  overrides: [
    {
      files: "**/*.ts",
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended"
      ],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: "./tsconfig.json"
      },
      rules: {
        semi: ["warn", "always", { omitLastInOneLineBlock: true }],
        quotes: "off",
        indent: "off",
        "comma-dangle": ["warn", "never"],
        "linebreak-style": "off",
        "no-console": "off",
        "no-var": "off",
        "no-undef": "off",
        "@typescript-eslint/camelcase": "off",
        "@typescript-eslint/no-explicit-any": "off"
      },
      plugins: ["@typescript-eslint"]
    }
  ]
};
