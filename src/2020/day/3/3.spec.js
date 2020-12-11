const assert = require("assert");
const input = require("./input.txt");

describe("Day 3: Toboggan Trajectory", () => {
  it("part 1: Starting at the top-left corner of your map and following a slope of right 3 and down 1, how many trees would you encounter?", () =>
    assert.strictEqual(response(input, [{ right: 3, down: 1 }]), 200));

  it("part 2: What do you get if you multiply together the number of trees encountered on each of the listed slopes?", () =>
    assert.strictEqual(
      response(input, [
        { right: 1, down: 1 },
        { right: 3, down: 1 },
        { right: 5, down: 1 },
        { right: 7, down: 1 },
        { right: 1, down: 2 },
      ]),
      3737923200
    ));
});

function response(map, slopes) {
  return slopes.map(part1(map)).reduce((a, b) => a * b, 1);
}

const part1 = (map) => ({ right, down }) => {
  let result = 0;
  for (let x = 0, y = 0; y < map.length; x += right, y += down)
    result += getCell(map, x, y) === "#" ? 1 : 0;
  return result;
};

function getCell(map, x, y) {
  return map[y][x % map[0].length];
}
