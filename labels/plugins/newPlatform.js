module.exports = function(payload, githubApi, parsed) {
  return parsed.some(fil => fil.type == "platform" && fil.status == "added")
    ? ["new-platform"]
    : [];
};
