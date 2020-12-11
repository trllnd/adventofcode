const assert = require("assert");
const input = require("./input.txt");

describe("Day 4: Passport Processing", () => {
    describe("part 1: In your batch file, how many passports are valid?", () => {
        it("should handle input", () => assert.strictEqual(part1(input), 226));
    });

});

const part1 = input => toPassports(input).reduce((a, passport) => a + (isValid1(passport) | 0), 0);

function toPassports(input) {
    let result = [];
    let current = {};

    for (const line of input) {
        if (line.trim() === "" && Object.keys(current).length > 0) {
            result.push(current)
            current = {}
        } else {
            for (const expression of line.split(" ")) {
                const [key, value] = expression.split(":")
                current[key] = value;
            }
        }
    }
    if ( Object.keys(current).length > 0) {
        result.push(current)
    }
    return result;
}

function isValid1(passport) {
    const keys = Object.keys(passport).reduce((a, k) => ({...a, [k]: true}), {});

    return (keys.byr
        && keys.iyr
        && keys.eyr
        && keys.hgt
        && keys.hcl
        && keys.ecl
        && keys.pid)
}
