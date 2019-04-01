module.exports = function(payload, githubApi, parsed) {
  return parsed.some(
    fil =>
      fil.type == "component" &&
      fil.status == "added" &&
      fil.filename === "__init__.py"
  )
    ? ["new-integration"]
    : [];
};
