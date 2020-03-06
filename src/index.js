module.exports = {
  parser: "babel-eslint",
  extends: [
    "eslint-config-airbnb-base",
    "eslint-config-prettier",
    "./rules/lyvly",
    "./rules/prettier"
  ].map(require.resolve)
};
