module.exports = {
  plugins: ["prettier"],
  extends: ["eslint-config-prettier"],
  rules: {
    // Enforce named exports over default exports
    "prettier/prettier": "error"
  }
};
