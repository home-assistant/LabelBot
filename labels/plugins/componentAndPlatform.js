const VALID_TYPES = ['component', 'platform'];

module.exports = function (payload, githubApi, files, parsed) {
  return parsed
    .filter(file => VALID_TYPES.includes(file.type))
    .map(file => file.type === 'component' ?
      `component: ${file.component}` :
      `platform: ${file.component}.${file.platform}`);
};
