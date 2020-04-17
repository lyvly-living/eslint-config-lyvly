module.exports = {
  plugins: ["jest", "jest-formatting"],
  extends: ["plugin:jest/recommended"],
  rules: {
    // Make sure there is a linebreak between all jest blocks
    "jest-formatting/padding-around-all": 2
  },
  env: {
    "jest/globals": true
  }
};
