const VALID_TYPES = ["component", "platform"];

module.exports = function(payload, githubApi, parsed) {
  return parsed
    .filter(file => VALID_TYPES.includes(file.type))
    .map(file => `integration: ${file.component}`);
};
