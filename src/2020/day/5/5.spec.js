const assert = require("assert");
const input = require("./input.txt");

describe("Day 5: Binary Boarding", () => {
    describe("part 1: What is the highest seat ID on a boarding pass?", () => {
        it("should handle input", () => assert.strictEqual(response(input), 965));

        [
            ["FBFBBFFRLR", 357],
            ["BFFFBBFRRR", 567],
            ["FFFBBBFRRR", 119],
            ["BBFFBBFRLL", 820]
        ].forEach(([pass, expected]) =>
            it(`${pass} id should be ${expected}`, () => assert.strictEqual(id(pass), expected)))

    });
});

const response = (input) => input.reduce((a, b) => Math.max(a, id(b)), 0);

const id = (pass) => {
    let row;
    for (let x = 0, y = 127, i = 0; i < 7; i++) {
        const l = pass[i];
        const offset = 1 + ~~((y - x) / 2);
        if (l === "F") y -= offset
        if (l === "B") x += offset
        if (i === 6) row = l === "F" ? x : y
    }

    let col;
    for (let x = 0, y = 7, i = 7; i < 10; i++) {
        const l = pass[i];
        const offset = 1 + ~~((y - x) / 2);
        if (l === "L") y -= offset
        if (l === "R") x += offset
        if (i === 9) col = l === "L" ? x : y
    }

    return (row * 8) + col;
}
