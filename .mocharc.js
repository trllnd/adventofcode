const fs = require("fs");

require.extensions[".txt"] = function (module, filename) {
  const lines = () => fs.readFileSync(filename, "utf8").trim().split`\n`;
  module.exports = { lines, groups: () => groups(lines()) };
};

function groups(input) {
  let result = [];
  let current = [];

  for (const line of input) {
    if (line.trim() === "" && Object.keys(current).length > 0) {
      result.push(current);
      current = [];
    } else {
      current.push(line);
    }
  }

  if (current.length > 0) {
    result.push(current);
  }
  return result;
}
