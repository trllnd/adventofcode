const assert = require("assert");
const input = require("./input.txt");

describe("find the two entries that sum to 2020 and then multiply those two numbers together", () => {
  it("should handle input", () => assert.strictEqual(response(input), 776064));

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
      assert.strictEqual(response(expenses), 40000);
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
      assert.strictEqual(response(expenses), null);
    })
  );
});

function response(expenses) {
  if (!Array.isArray(expenses)) return null;

  let a,
    b,
    index_a = 0,
    index_b = 0;

  do {
    if (index_b >= expenses.length - 1) index_b = ++index_a;
    if (index_a >= expenses.length - 1) return null;
    a = parseInt(expenses[index_a]);
    b = parseInt(expenses[++index_b]);
  } while (a + b !== 2020);

  console.log(a, b);
  return a * b;
}
