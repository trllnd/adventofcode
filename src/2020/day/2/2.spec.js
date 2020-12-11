const assert = require("assert");
const input = require("./input.txt");

describe("Day 2: Password Philosophy", () => {
  it("part 1: how many passwords are valid according to their policies?", () =>
    assert.strictEqual(response(validate1, input), 469));

  it("part 2: how many passwords are valid according to their policies?", () =>
    assert.strictEqual(response(validate2, input), 267));

  ["1-3 a: abcde", "2-9 c: ccccccccc"].forEach((password) =>
    it(`${password} should be valid`, () => assert(validate1(password)))
  );

  ["1-3 b: cdefg"].forEach((password) =>
    it(`${password} should not be valid`, () => assert(!validate1(password)))
  );

  ["1-3 a: abcde"].forEach((password) =>
    it(`${password} should be valid`, () => assert(validate2(password)))
  );

  ["1-3 b: cdefg", "2-9 c: ccccccccc"].forEach((password) =>
    it(`${password} should not be valid`, () => assert(!validate2(password)))
  );
});

function response(validate, passwords) {
  let n = 0;
  for (const password of passwords) n += validate(password);
  return n;
}

function validate1(password) {
  const { lower, upper, char, value } = password.match(
    /^(?<lower>\d+)-(?<upper>\d+)\s(?<char>.):\s(?<value>.+)/
  ).groups;

  const occurrence = value.split(char).length - 1;
  return lower <= occurrence && occurrence <= upper;
}

function validate2(password) {
  const { pos1, pos2, char, value } = password.match(
    /^(?<pos1>\d+)-(?<pos2>\d+)\s(?<char>.):\s(?<value>.+)/
  ).groups;

  return (value[pos1 - 1] == char) ^ (value[pos2 - 1] == char);
}
