module.exports = function (payload, githubApi, files, parsed) {
  return (payload.pull_request.base.ref === 'master') ? ['merging-to-master'] : [];
};
