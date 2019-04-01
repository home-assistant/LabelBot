var assert = require("assert");

var newIntegration = require("../../labels/plugins/newIntegration");
var parsePath = require("../../labels/util/parse_path");

function getOutput(file, status) {
  var output = newIntegration(null, null, [
    parsePath({
      filename: "homeassistant/components/" + file,
      status
    })
  ]);
  return output.length ? output[0] : null;
}

describe("newIntegration", () => {
  it("add new integration", () => {
    assert.deepEqual(getOutput("http/__init__.py", "added"), "new-integration");
  });

  it("add platform to integration", () => {
    assert.deepEqual(getOutput("mqtt/fan.py", "added"), null);
  });
});
