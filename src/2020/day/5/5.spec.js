const assert = require("assert");
const input = require("./input.txt").lines();

describe("Day 5: Binary Boarding", () => {
  it("part 1: What is the highest seat ID on a boarding pass?", () =>
    assert.strictEqual(part1(input), 965));

  it("part 2: What is the ID of your seat?", () =>
    assert.strictEqual(part2(input), 524));

  [
    ["FBFBBFFRLR", 357],
    ["BFFFBBFRRR", 567],
    ["FFFBBBFRRR", 119],
    ["BBFFBBFRLL", 820],
  ].forEach(([pass, expected]) =>
    it(`${pass} id should be ${expected}`, () =>
      assert.strictEqual(id(pass), expected))
  );
});

const part2 = (input) =>
  1 +
  input
    .map(id)
    .sort((a, b) => a - b)
    .find(
      (id, i, arr) =>
        i !== 0 && i !== input.length - 1 && arr[i + 1] - arr[i - 1] !== 2
    );

const part1 = (input) => input.reduce((a, b) => Math.max(a, id(b)), 0);

const id = (pass) => {
  let row;
  for (let x = 0, y = 127, i = 0; i < 7; i++) {
    const l = pass[i];
    const offset = 1 + ~~((y - x) / 2);
    if (l === "F") y -= offset;
    if (l === "B") x += offset;
    if (i === 6) row = l === "F" ? x : y;
  }

  let col;
  for (let x = 0, y = 7, i = 7; i < 10; i++) {
    const l = pass[i];
    const offset = 1 + ~~((y - x) / 2);
    if (l === "L") y -= offset;
    if (l === "R") x += offset;
    if (i === 9) col = l === "L" ? x : y;
  }

  return row * 8 + col;
};
