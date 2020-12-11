const assert = require("assert");
const input = require("./input.txt");

describe("Day 3: Toboggan Trajectory", () => {
    describe("part 1: Starting at the top-left corner of your map and following a slope of right 3 and down 1, how many trees would you encounter?", () => {
        it("should handle input", () => assert.strictEqual(response(input, {right: 3, down: 1}), 0));
    });
});

function response(map, {right, down}) {
    let result = 0;
    for (let x = 0, y = 0; y < map.length; x += right, y += down) result += getCell(map, x, y) === "#" ? 1 : 0;
    return result;
}

function getCell(map, x, y) {
    return map[y][x % (map[0].length)]
}
