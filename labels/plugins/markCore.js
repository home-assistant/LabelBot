module.exports = function (payload, githubApi, files, parsed) {
  return parsed.filter(file => file.core).length > 0 ? ['core'] : [];
}
