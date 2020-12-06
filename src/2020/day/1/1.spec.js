const assert = require("assert");
const input = require("./input.txt");

describe("day 1", () => {
  describe("part 1: find the two entries that sum to 2020 and then multiply those two numbers together", () => {
    it("should handle input", () =>
      assert.strictEqual(response(2, input), 776064));

    [
      [20, 2000, 1, 1, 1],
      [20, 1, 2000, 1, 1],
      [20, 1, 1, 2000, 1],
      [20, 1, 1, 1, 2000],
      [1, 1, 1, 20, 2000],
      [1, 1, 20, 1, 2000],
      [1, 20, 1, 1, 2000],
      [1, 1, 20, 2000, 1],
      [1, 20, 1, 2000, 1],
    ].forEach((expenses) => {
      it(`should find solution for "${expenses}"`, () => {
        assert.strictEqual(response(2, expenses), 40000);
      });
    });

    [
      null,
      [],
      [1],
      [1010, 1, 1, 1, 1],
      [1, 1010, 1, 1, 1],
      [1, 1, 1010, 1, 1],
      [1, 1, 1, 1010, 1],
      [1, 1, 1, 1, 1010],
    ].forEach((expenses) =>
      it(`should find no solution for "${expenses}"`, () => {
        assert.strictEqual(response(2, expenses), null);
      })
    );
  });
  describe("part 2: find the three entries that sum to 2020 and then multiply those three numbers together", () => {
    it("should handle input", () =>
      assert.strictEqual(response(3, input), 6964490));

    [
      [20, 1000, 1000, 1, 1],
      [1, 20, 1000, 1000, 1],
      [1, 1, 20, 1000, 1000],
      [20, 1, 1000, 1000, 1],
      [1, 20, 1, 1000, 1000],
      [20, 1000, 1, 1000, 1],
      [1, 20, 1000, 1, 1000],
      [20, 1, 1000, 1, 1000],
    ].forEach((expenses) => {
      it(`should find solution for "${expenses}"`, () => {
        assert.strictEqual(response(3, expenses), 20000000);
      });
    });

    [
      null,
      [],
      [1],
      [20, 2000, 1, 1, 1],
      [20, 1, 2000, 1, 1],
      [20, 1, 1, 2000, 1],
      [20, 1, 1, 1, 2000],
      [1, 1, 1, 20, 2000],
      [1, 1, 20, 1, 2000],
      [1, 20, 1, 1, 2000],
      [1, 1, 20, 2000, 1],
      [1, 20, 1, 2000, 1],
    ].forEach((expenses) =>
      it(`should find no solution for "${expenses}"`, () => {
        assert.strictEqual(response(3, expenses), null);
      })
    );
  });
});

function response(n, expenses) {
  if (!Array.isArray(expenses)) return null;

  let elements = Array(n).fill(0),
    indexes = Array(n).fill(0);

  do {
    for (let i = n; i > 0; i--)
      if (indexes[i] >= expenses.length - 1) indexes[i] = ++indexes[i - 1];
    if (indexes[0] >= expenses.length - 1) return null;
    indexes[n - 1]++;
    elements = indexes.map((index) => parseInt(expenses[index]));
  } while (elements.reduce((a, b) => a + b, 0) !== 2020);

  const result = elements.reduce((a, b) => a * b, 1);
  console.log(result, elements);
  return result;
}
