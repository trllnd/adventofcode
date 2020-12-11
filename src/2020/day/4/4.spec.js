const assert = require("assert");
const input = require("./input.txt");

describe("Day 4: Passport Processing", () => {
  it("part 1: In your batch file, how many passports are valid?", () =>
    assert.strictEqual(response(isValid1, input), 226));

  it("part 2: In your batch file, how many passports are valid?", () =>
    assert.strictEqual(response(isValid2, input), 160));
});

const response = (isValid, input) =>
  toPassports(input).reduce((a, passport) => a + (isValid(passport) | 0), 0);

function toPassports(input) {
  let result = [];
  let current = {};

  for (const line of input) {
    if (line.trim() === "" && Object.keys(current).length > 0) {
      result.push(current);
      current = {};
    } else {
      for (const expression of line.split(" ")) {
        const [key, value] = expression.split(":");
        current[key] = value;
      }
    }
  }
  if (Object.keys(current).length > 0) {
    result.push(current);
  }
  return result;
}

function isValid1(passport) {
  const keys = Object.keys(passport).reduce(
    (a, k) => ({ ...a, [k]: true }),
    {}
  );

  return (
    keys.byr &&
    keys.iyr &&
    keys.eyr &&
    keys.hgt &&
    keys.hcl &&
    keys.ecl &&
    keys.pid
  );
}

function isValid2(passport) {
  const year = /^(?<year>\d{4})$/;

  const byr = passport.byr?.match(year)?.groups.year;
  const iyr = passport.iyr?.match(year)?.groups.year;
  const eyr = passport.eyr?.match(year)?.groups.year;
  const { hgtValue, hgtUnit } =
    passport.hgt?.match(/^(?<hgtValue>\d+)(?<hgtUnit>(in|cm))$/)?.groups || {};
  const hcl = /^#([0-9]|[a-f]){6}$/.test(passport.hcl);
  const ecl = /^(amb|blu|brn|gry|grn|hzl|oth)$/.test(passport.ecl);
  const pid = /^[0-9]{9}$/.test(passport.pid);

  return (
    1920 <= byr &&
    byr <= 2002 &&
    2010 <= iyr &&
    iyr <= 2020 &&
    2020 <= eyr &&
    eyr <= 2030 &&
    ((hgtUnit === "cm" && 150 <= hgtValue && hgtValue <= 193) ||
      (hgtUnit === "in" && 59 <= hgtValue && hgtValue <= 76)) &&
    hcl &&
    ecl &&
    pid
  );
}
