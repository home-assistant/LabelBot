module.exports = function (payload, githubApi, files) {
  return (payload.pull_request.base.ref === 'master') ? ['merging-to-master'] : [];
};
