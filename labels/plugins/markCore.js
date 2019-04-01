module.exports = function(payload, githubApi, parsed) {
  return parsed.filter(file => file.core).length > 0 ? ["core"] : [];
};
