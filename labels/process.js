// Convert a list of file paths to labels to set
const parsePath = require("./util/parse_path");

const PLUGINS = [
  "componentAndPlatform",
  "newIntegration",
  "newPlatform",
  "removePlatform",
  "warnOnMergeToMaster",
  "markCore",
  "smallPR",
  "hasTests"
];

module.exports = function(body, github, files) {
  const parsed = files.map(parsePath).filter(Boolean);
  const labelSet = new Set();

  PLUGINS.forEach(name => {
    const plugin = require(`./plugins/${name}.js`);

    for (let label of plugin(body, github, parsed)) {
      labelSet.add(label);
    }
  });

  return Array.from(labelSet);
};
