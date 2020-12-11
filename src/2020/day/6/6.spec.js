const assert = require("assert");
const input = require("./input.txt").groups();

describe("Day 6: Custom Customs", () => {
  it("part 1: What is the sum of those counts?", () =>
    assert.strictEqual(response(input), 6551));
});

const response = (input) =>
  input.reduce((a, b) => a + new Set(b.join("")).size, 0);
