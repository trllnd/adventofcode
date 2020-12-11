const assert = require("assert");
const input = require("./input.txt").groups();

describe("Day 6: Custom Customs", () => {
  it('part 1: For each group, count the number of questions to which anyone answered "yes". What is the sum of those counts?', () =>
    assert.strictEqual(part1(input), 6551));

  it('part 2: For each group, count the number of questions to which everyone answered "yes". What is the sum of those counts?', () =>
    assert.strictEqual(part2(input), 3358));
});

const part1 = (input) =>
  input.reduce((a, group) => a + new Set(group.join("")).size, 0);

const part2 = (input) =>
  input.reduce(
    (a, group) =>
      a +
      group
        .flatMap((l) => l.split(""))
        .sort()
        .join("")
        .match(/(.)\1*/g)
        .filter((_) => _.length === group.length).length,
    0
  );
