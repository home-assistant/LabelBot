module.exports = function(payload, githubApi, parsed) {
  return payload.pull_request.base.ref === "master"
    ? ["merging-to-master"]
    : [];
};
