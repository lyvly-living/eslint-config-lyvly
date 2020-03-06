module.exports = {
  parser: "babel-eslint",

  extends: [
    "eslint-config-airbnb",
    "eslint-config-prettier",
    "./rules/lyvly",
    "./rules/prettier"
  ].map(require.resolve),

  plugins: ["jest"],

  env: {
    "jest/globals": true
  },

  rules: {
    // In React world, we allow default exports.
    "import/no-default-export": "off"
  }
};
