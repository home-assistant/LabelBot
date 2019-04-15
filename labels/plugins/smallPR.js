const SMALL_PR_THRESHOLD = 30;

module.exports = function(payload, githubApi, parsed) {
  const total = parsed.reduce(
    (tot, file) =>
      file.type === "test" || file.type === null ? tot : tot + file.additions,
    0
  );
  return total < SMALL_PR_THRESHOLD ? ["small-pr"] : [];
};
