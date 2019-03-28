// Convert a list of file paths to labels to set
const parsePath = require('./util/parse_path');

const PLUGINS = [
  'componentAndPlatform',
  'newIntegration',
  'newPlatform',
  'removePlatform',
  'warnOnMergeToMaster',
  'markCore',
  'smallPR'
];

module.exports = function(body, github, files) {
  const parsed = files.map(file => {
    const parsedFile = parsePath(file.filename);
    if (parsedFile === null) {
      return null;
    }
    parsedFile.status = file.status;
    return parsedFile;
  }).filter(file => file !== null);
  const labelSet = new Set();

  PLUGINS.forEach(name => {
    const plugin = require(`./plugins/${name}.js`);

    for (let label of plugin(body, github, files, parsed)) {
      labelSet.add(label);
    }
  });

  return Array.from(labelSet);
}
