module.exports = function(payload, githubApi, parsed) {
  return parsed.some(item => item.type === "test") ? ["has-tests"] : [];
};
