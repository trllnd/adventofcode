const assert = require("assert");
const input = require("./input.txt");

describe("day 2", () =>
  describe("How many passwords are valid according to their policies?", () => {
    it("should handle input", () => assert.strictEqual(response(input), 469));

    ["1-3 a: abcde", "2-9 c: ccccccccc"].forEach((password) =>
      it(`${password} should be valid`, () => {
        assert(isValid(password));
      })
    );

    ["1-3 b: cdefg"].forEach((password) =>
      it(`${password} should not be valid`, () => {
        assert(!isValid(password));
      })
    );
  }));

function response(passwords) {
  let n = 0;
  for (const password of passwords) n += isValid(password);
  return n;
}

function isValid(password) {
  const { lower, upper, char, value } = password.match(
    /^(?<lower>\d+)-(?<upper>\d+)\s(?<char>.):\s(?<value>.+)/
  ).groups;

  const occurrence = value.split(char).length - 1;
  return lower <= occurrence && occurrence <= upper;
}
