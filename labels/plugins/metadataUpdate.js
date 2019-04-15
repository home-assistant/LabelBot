const METADATA_FILES = [
  "CODEOWNERS",
  "manifest.json",
  "requirements_all.txt",
  "requirements_docs.txt",
  "requirements_test.txt",
  "requirements_test_all.txt",
  "services.yaml"
];

module.exports = function(payload, githubApi, parsed) {
  return parsed.every(fil => METADATA_FILES.includes(fil.filename))
    ? ["metadata-only"]
    : [];
};
