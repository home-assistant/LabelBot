module.exports = function(payload, githubApi, parsed) {
  return parsed.some(file => file.core) ? ["core"] : [];
};
