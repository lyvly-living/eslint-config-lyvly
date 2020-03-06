/* eslint strict: 0, global-require: 0 no-unused-expressions: 0 */

describe("index", () => {
  it("parses the entry point", () => {
    expect(() => require("..")).not.toThrow;
  });
});
