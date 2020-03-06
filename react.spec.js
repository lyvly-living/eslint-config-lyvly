/* eslint strict: 0, global-require: 0 no-unused-expressions: 0 */

describe("react", () => {
  it("parses the entry point", () => {
    expect(() => require("./react")).not.toThrow;
  });
});
