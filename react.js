module.exports = {
  parser: "babel-eslint",

  extends: [
    "eslint-config-airbnb",
    "eslint-config-airbnb/hooks",
    "./rules/jest",
    "./rules/lyvly",
    "./rules/prettier",
    "./rules/react"
  ].map(require.resolve),

  env: {
    browser: true
  }
};
