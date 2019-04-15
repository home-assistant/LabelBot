var assert = require("assert");

var metadataUpdate = require("../../labels/plugins/metadataUpdate");
var parsePath = require("../../labels/util/parse_path");

function getOutput(files) {
  var output = metadataUpdate(
    null,
    null,
    files.map(filename =>
      parsePath({
        filename
      })
    )
  );
  return output.length ? output[0] : null;
}

describe("metadataUpdate", () => {
  it("tags metadata only updates", () => {
    assert.deepEqual(
      getOutput([
        "CODEOWNERS",
        "requirements_all.txt",
        "requirements_docs.txt",
        "requirements_test.txt",
        "requirements_test_all.txt",
        "homeassistant/components/mqtt/manifest.json",
        "homeassistant/components/mqtt/services.yaml"
      ]),
      "metadata-only"
    );
  });

  it("detects non-metadata file changes", () => {
    assert.deepEqual(
      getOutput(["requirements_all.txt", "homeassistant/core.py"]),
      null
    );
  });
});
