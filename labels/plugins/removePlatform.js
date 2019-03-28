module.exports = function (payload, githubApi, files, parsed) {
  return parsed.some(
    fil => fil.type == 'platform' &&
    fil.status == 'removed'
  ) ? ['remove-platform'] : []
}
