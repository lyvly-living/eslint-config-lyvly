module.exports = {
  plugins: ["jest", "jest-formatting"],
  extends: ["plugin:jest/recommended"],
  rules: {
    // We want a linebreak between it() blocks
    "jest-formatting/padding-around-test-blocks": 2
  },
  env: {
    "jest/globals": true
  }
};
