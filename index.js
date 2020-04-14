module.exports = {
  parser: "babel-eslint",
  extends: [
    "eslint-config-airbnb-base",
    "./rules/jest",
    "./rules/lyvly",
    "./rules/prettier"
  ].map(require.resolve)
};
