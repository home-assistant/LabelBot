const SMALL_PR_THRESHOLD = 30;

module.exports = function (payload, githubApi, files, parsed) {
  return files.reduce((tot, file) => tot + file.additions, 0) < SMALL_PR_THRESHOLD ?
    ['small-pr'] : [];
}
