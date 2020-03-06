module.exports = {
  testPathIgnorePatterns: ["./node_modules/", "/lib/"],
  moduleFileExtensions: ["js"],
  transform: {
    "^.+\\.js?$": "babel-jest"
  },
  testEnvironment: "node"
};
